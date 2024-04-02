using ExternalServices.Spotify.Models.Song;
using ExternalServices.Spotify.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify.Models.Playlist
{
    public class PlaylistTrack
    {
        public string Added_at { get; set; }
        public Owner Added_by { get; set; }
        public bool Is_local { get; set; }
        public TrackBase Track { get; set; }
        public int Order { get; set; }
    }
}
