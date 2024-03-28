using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify.Models
{
    public class Owner
    {
        public ExternalUrls External_urls { get; set; }
        public Followers Followers { get; set; }
        public string Href { get; set; }
        public string Id { get; set; }
        public string Type { get; set; }
        public string Uri { get; set; }
        public string Display_name { get; set; }
    }
}
