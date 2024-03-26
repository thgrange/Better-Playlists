using Microsoft.EntityFrameworkCore;

namespace Database.Models
{
    public class ZeroContext : DbContext
    {
        public ZeroContext(DbContextOptions<ZeroContext> options) : base(options)
        {}

        public DbSet<User> Users { get; set; }
    }
}