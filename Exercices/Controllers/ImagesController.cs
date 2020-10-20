using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Exercices.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace exercices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        public Context Context { get; }
        public IWebHostEnvironment WebHostEnvironment { get; }

        public ImagesController(Context context, IWebHostEnvironment webHostEnvironment)
        {
            Context = context;
            WebHostEnvironment = webHostEnvironment;
        }

        // GET: api/images
        [HttpGet]
        public async Task<List<Image>> Get()
        {
            var images = await Context.Images.ToListAsync();
            /*foreach(var image in images)
            {
                image.ImageBytes = ConvertImageBytes(Convert.ToBase64String(image.ImageBytes));
            }*/
            return images;
        }

        // GET api/images/5
        [HttpGet("{id}")]
        public async Task<Image> Get(int id)
        {
            var image = await Context.Images.FirstOrDefaultAsync(i => i.Id == id);
            if(image != null)
                image.ImageBytes = ConvertImageBytes(Convert.ToBase64String(image.ImageBytes));

            return image;
        }
        private byte[] ConvertImageBytes(string imageString)
        {
            if (string.IsNullOrEmpty(imageString))
                return null;
            else
                return Convert.FromBase64String(imageString);
        }
        // POST api/images
        [HttpPost]
        public async Task Post([FromBody] Image image)
        {
            /*
            string root = WebHostEnvironment.WebRootPath;
            string fileName = Path.GetFileNameWithoutExtension(image.Path);
            string extention = Path.GetExtension(image.Path);
            image.Path = fileName + "[" + DateTime.Now.Ticks + "]" + extention;
            string path = Path.Combine(root + "/Image", fileName);
            */
            if (image.File.Length > 0)
            {
                using (var stream = new MemoryStream())
                {
                    await image.File.CopyToAsync(stream);
                    image.ImageBytes = stream.ToArray();
                }
            }

            Context.Add(image);
            await Context.SaveChangesAsync();
        }

        // PUT api/images/5
        [HttpPut()]
        public async Task Put([FromBody] Image image)
        {
            var dbImage = Context.Images.FirstOrDefault(r => r.Id.Equals(image.Id));

            if (dbImage == null)
                throw new System.Exception("image not found");
            //update
            dbImage.Title = image.Title;
            dbImage.Description = image.Description;

            // save
            Context.Images.Attach(dbImage);
            Context.Entry(dbImage).State = EntityState.Modified;
            await Context.SaveChangesAsync();
        }

        // DELETE api/images/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var dbImage = Context.Images.FirstOrDefault(r => r.Id.Equals(id));

            if (dbImage == null)
                throw new System.Exception("image not found");

            Context.Images.Remove(dbImage);
            await Context.SaveChangesAsync();
        }
    }
}
