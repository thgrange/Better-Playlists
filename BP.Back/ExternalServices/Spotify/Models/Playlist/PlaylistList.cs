using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify.Models.Playlist
{
    public class PlaylistList
    {
        public string Href { get; set; }
        public int? Limit { get; set; }
        public string Next { get; set; }
        public string Previous { get; set; }
        public int? Offset { get; set; }
        public int? Total { get; set; }
        public IEnumerable<PlaylistItem> Items { get; set; }
        public int PageNumber { get; set; }
        public bool HasMore { get; set; }
    }
}
