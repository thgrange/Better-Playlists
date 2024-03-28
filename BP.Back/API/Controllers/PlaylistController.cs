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
    }
}
