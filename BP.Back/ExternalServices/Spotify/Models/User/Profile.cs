using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExternalServices.Spotify.Models.Common;

namespace ExternalServices.Spotify.Models.User
{
    public class Profile : SpotifyItem
    {
        public string Country { get; set; }
        public string Display_name { get; set; }
        public ExplicitContent Explicit_content { get; set; }
        public ExternalUrls External_urls { get; set; }
        public Followers Followers { get; set; }
        public IEnumerable<Image> Images { get; set; }
        public string Product { get; set; }
        public string Type { get; set; }
    }
}
