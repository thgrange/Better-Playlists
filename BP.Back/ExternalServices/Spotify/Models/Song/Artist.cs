using ExternalServices.Spotify.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify.Models.Song
{
    public class Artist : ArtistBase
    {
        public Followers Followers { get; set; }
        public IEnumerable<string> Genres { get; set; }
        public IEnumerable<Image> Images { get; set; }
        public int Popularity { get; set; }
    }
}
