using Database.Models;
using ExternalServices.Spotify.Models.Playlist;
using ExternalServices.Spotify.Models.User;
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
        Playlist GetPlaylist(string playlistId);
        PlaylistTracks GetPlaylistTracks(string playlistId, int pageSize, int pageNumber);
        IEnumerable<string> GetPlaylistAllTracks(string playlistId);
        User Connect();
    }
}
