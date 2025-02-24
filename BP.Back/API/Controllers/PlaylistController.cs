using API.Attributes;
using ExternalServices.Spotify;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [SpotifyAuthenticator]
    public class PlaylistController : SpotifyLoggedController
    {
        public PlaylistController(ISpotifyService spotifyService)
        {
            SpotifyService = spotifyService;
        }

        [HttpGet("getplaylists")]
        public IActionResult GetPlaylists(int pageSize, int pageNumber)
        {
            var playlists = SpotifyService.GetCurrentUserPlaylists(pageSize, pageNumber);

            return Ok(playlists);
        }

        [HttpGet("{playlistId}")]
        public IActionResult GetPlaylist(string playlistId)
        {
            var playlist = SpotifyService.GetPlaylist(playlistId);

            return Ok(playlist);
        }

        [HttpGet("{playlistId}/gettracks")]
        public IActionResult GetPlaylistTracks(string playlistId, int pageSize, int pageNumber)
        {
            var tracks = SpotifyService.GetPlaylistTracks(playlistId, pageSize, pageNumber);

            return Ok(tracks);
        }

        [HttpGet("{playlistId}/getalltracks")]
        public IActionResult GetPlaylistAllTracks(string playlistId)
        {
            var tracks = SpotifyService.GetPlaylistAllTracks(playlistId);

            return Ok(tracks);
        }
    }
}
