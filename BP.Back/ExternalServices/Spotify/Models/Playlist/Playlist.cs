using ExternalServices.Spotify.Models.Common;
using ExternalServices.Spotify.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify.Models.Playlist
{
    public class Playlist : SpotifyItem
    {
        public bool Collaborative { get; set; }
        public string Description { get; set; }
        public ExternalUrls External_urls { get; set; }
        public Followers Followers { get; set; }
        public IEnumerable<Image> Images { get; set; }
        public string Name { get; set; }
        public Owner Owner { get; set; }
        public bool Public { get; set; }
        public PlaylistTracks Tracks { get; set; }
        public string Type { get; set; }
        public string Primary_color { get; set; }
    }
}
