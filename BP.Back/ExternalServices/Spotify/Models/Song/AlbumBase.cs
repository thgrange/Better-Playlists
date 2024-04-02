using ExternalServices.Spotify.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify.Models.Song
{
    public class AlbumBase : SpotifyItem
    {
        public string Album_type { get; set; }
        public int Total_tracks { get; set; }
        public IEnumerable<string> Available_markets { get; set; }
        public ExternalUrls External_urls { get; set; }
        public IEnumerable<Image> Images { get; set; }
        public string Name { get; set; }
        public string Release_date { get; set; }
        public string Release_date_precision { get; set; }
        public Restrictions Restrictions { get; set; }
        public string Type { get; set; }
        public IEnumerable<ArtistBase> Artists { get; set; }
    }
}
