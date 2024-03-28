using ExternalServices.Spotify.Models;
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
            var result = httpClient.GetFromJsonAsync<Profile>("me").Result;

            return result;
        }

        public PlaylistList GetCurrentUserPlaylists(int pageSize, int pageNumber)
        {
            var result = httpClient.GetFromJsonAsync<PlaylistList>($"me/playlists?offset={pageSize * pageNumber}&limit={pageSize}").Result;

            return result;
        }

        public void GetPlayerConnection(string deviceId, bool play)
        {
            var playerConnectionObject = JsonContent.Create(new { device_ids = new List<string> { deviceId }.ToArray(), play = play });
            httpClient.PutAsync("me/player", playerConnectionObject);
        }
    }
}
