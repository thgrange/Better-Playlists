using Microsoft.EntityFrameworkCore;

namespace Database.Models
{
    public class BPContext : DbContext
    {
        public BPContext(DbContextOptions<BPContext> options) : base(options)
        {}

        public DbSet<Room> Rooms { get; set; }
		public DbSet<WaitingTrack> WaitingTracks { get; set; }
	}
}