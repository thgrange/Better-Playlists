using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify.Models.Common
{
    public abstract class SpotifyItem
    {
        public string Id { get; set; }
        public string Href { get; set; }
        public string Uri { get; set; }
    }
}
