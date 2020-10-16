using Microsoft.EntityFrameworkCore;

namespace exercices
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
