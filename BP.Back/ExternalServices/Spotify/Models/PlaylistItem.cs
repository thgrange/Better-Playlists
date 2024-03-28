using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify.Models
{
    public class PlaylistItem
    {
        public bool Collaborative { get; set; }
        public string Description { get; set; }
        public ExternalUrls External_urls { get; set; }
        public string Href { get; set; }
        public string Id { get; set; }
        public IEnumerable<Image> Images { get; set; }
        public string Name { get; set; }
        public Owner Owner { get; set; }
        public bool Public { get; set; }
        public string Snapshot_id { get; set; }
        public Tracks Tracks { get; set; }
        public string Type { get; set; }
        public string Uri { get; set; }
    }
}
