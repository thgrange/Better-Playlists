using Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Repositories
{
    public class TrackRepository : Repository<Track>
    {
        public TrackRepository(BPContext context) : base(context) { }

        public Track GetUserTrack(Guid  userId, string trackId)
        {
            var track = _context.Tracks.Where(t => t.UserId == userId && t.TrackId ==  trackId).FirstOrDefault();

            return track;
        }
    }
}
