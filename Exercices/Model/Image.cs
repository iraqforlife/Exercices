using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exercices.Model
{
    public class Image
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        [NotMapped]
        public IFormFile File { get; set; }
        public byte[] ImageBytes { get; set; }
    }
}
