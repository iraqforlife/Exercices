﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Exercices.Model;
using Microsoft.AspNetCore.Authorization;
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

        public ImagesController(Context context)
        {
            Context = context;
        }

        // GET: api/images
        [HttpGet]
        public async Task<List<Image>> Get()
        {
            var images = await Context.Images.ToListAsync();
            return images;
        }

        // GET api/images/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<Image> Get(int id)
        {
            return await Context.Images.FirstAsync(i => i.Id == id);
        }

        // POST api/images
        [HttpPost]
        public async Task Post([FromBody] Image image)
        {
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
            dbImage.Title = image.Title;
            dbImage.Description = image.Description;
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
