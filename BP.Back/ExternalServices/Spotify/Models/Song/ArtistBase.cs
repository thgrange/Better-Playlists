using ExternalServices.Spotify.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify.Models.Song
{
    public class ArtistBase : SpotifyItem
    {
        public ExternalUrls External_urls { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}
