using ExternalServices.Spotify.Models.Common;
using ExternalServices.Spotify.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify.Models.Song
{
    public class TrackBase : SpotifyItem
    {
        public AlbumBase Album { get; set; }
        public IEnumerable<Artist> Artists { get; set; }
        public IEnumerable<string> Available_markets { get; set; }
        public int Disc_number { get; set; }
        public int Duration_ms { get; set; }
        public bool Explicit {  get; set; }
        public ExternalIds External_ids { get; set; }
        public ExternalUrls External_urls { get; set; }
        public bool IsPlayable { get; set; }
        public Restrictions Restrictions { get; set; }
        public string Name { get; set; }
        public int Popularity { get; set; }
        public string Preview_url { get; set; }
        public int Track_number { get; set; }
        public string Type {  get; set; }
        public bool Is_local { get; set; }
    }
}
