using ExternalServices.Spotify.Models.Playlist;
using ExternalServices.Spotify.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify
{
    public class SpotifyService : ISpotifyService
    {
        private string bearerToken = string.Empty;
        private HttpClient httpClient;

        public SpotifyService()
        {
            httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://api.spotify.com/v1/")
            };
        }

        public void IdentiySpotifyUser(string bearer)
        {
            bearerToken = bearer;
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);
        }

        public Profile GetCurrentUserProfile()
        {
            var profile = httpClient.GetFromJsonAsync<Profile>("me").Result;

            return profile;
        }

        public PlaylistList GetCurrentUserPlaylists(int pageSize, int pageNumber)
        {
            var playlists = httpClient.GetFromJsonAsync<PlaylistList>($"me/playlists?offset={pageSize * pageNumber}&limit={pageSize}").Result;

            if (playlists != null)
            {
                playlists.PageNumber = pageNumber;
                playlists.HasMore = playlists.Items != null && playlists.Items.Any() && playlists.Limit + playlists.Offset <= playlists.Total;
            }

            return playlists;
        }

        public void GetPlayerConnection(string deviceId, bool play)
        {
            var playerConnectionObject = JsonContent.Create(new { device_ids = new List<string> { deviceId }.ToArray(), play = play });
            httpClient.PutAsync("me/player", playerConnectionObject);
        }

        public Playlist GetPlaylist(string playlistId)
        {
            var playlist = httpClient.GetFromJsonAsync<Playlist>($"playlists/{playlistId}?fields=collaborative,description,external_urls,followers,href,id,images,name,owner,public,snapshot_id,type,uri,primary_color").Result;

            return playlist;
        }

        public PlaylistTracks GetPlaylistTracks(string playlistId, int pageSize, int pageNumber)
        {
            var playlistTracks = httpClient.GetFromJsonAsync<PlaylistTracks>($"playlists/{playlistId}/tracks?offset={pageSize * pageNumber}&limit={pageSize}").Result;

            // Appliquer la surcouche liée à la notation des titres ici (créer un service de filtre sur les titre ?)

            if (playlistTracks != null)
            {
                playlistTracks.PageNumber = pageNumber;
                playlistTracks.HasMore = playlistTracks.Items != null && playlistTracks.Items.Any() && playlistTracks.Limit + playlistTracks.Offset <= playlistTracks.Total;
                var order = pageSize * pageNumber + 1;
                foreach (var track in playlistTracks.Items)
                    track.Order = order++;
            }

            return playlistTracks;
        }
    }
}
