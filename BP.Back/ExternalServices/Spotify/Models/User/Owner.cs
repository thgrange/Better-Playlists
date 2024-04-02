using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExternalServices.Spotify.Models.Common;

namespace ExternalServices.Spotify.Models.User
{
    public class Owner : SpotifyItem
    {
        public ExternalUrls External_urls { get; set; }
        public Followers Followers { get; set; }
        public string Type { get; set; }
        public string Display_name { get; set; }
    }
}
