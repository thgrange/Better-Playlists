using ExternalServices.Spotify.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify
{
    public interface ISpotifyService
    {
        void IdentiySpotifyUser(string bearer);
        Profile GetCurrentUserProfile();
        PlaylistList GetCurrentUserPlaylists(int pageSize, int pageNumber);
        void GetPlayerConnection(string deviceId, bool play);
    }
}
