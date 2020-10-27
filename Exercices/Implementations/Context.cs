using Exercices.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace exercices
{
    public class Context : IdentityDbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) { }

        public DbSet<Image> Images { get; set; }
    }
}
