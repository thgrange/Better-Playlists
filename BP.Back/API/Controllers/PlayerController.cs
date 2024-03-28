using API.Attributes;
using ExternalServices.Spotify;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [SpotifyAuthenticator]
    public class PlayerController : SpotifyLoggedController
    {
        public PlayerController(ISpotifyService spotifyService)
        {
            SpotifyService = spotifyService;
        }

        [HttpGet("getplayerconnection")]
        public IActionResult GetPlaylists(string deviceId, bool play)
        {
            SpotifyService.GetPlayerConnection(deviceId, play);

            return Ok();
        }
    }
}
