using Microsoft.EntityFrameworkCore;

namespace _0tout.DB.Models
{
    public class ZeroContext : DbContext
    {
        public ZeroContext(DbContextOptions<ZeroContext> options) : base(options)
        {}

        public DbSet<User> Users { get; set; }
    }
}