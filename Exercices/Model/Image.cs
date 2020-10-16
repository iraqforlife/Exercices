using System.ComponentModel.DataAnnotations;

namespace Exercices.Model
{
    public class Image
    {

        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
