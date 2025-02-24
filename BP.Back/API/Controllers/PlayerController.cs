using API.Attributes;
using ExternalServices.Spotify;
using Microsoft.AspNetCore.Mvc;
using Services.Weighting;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [SpotifyAuthenticator]
    public class PlayerController : SpotifyLoggedController
    {
        private IWeightingService _weightingService;
        public PlayerController(ISpotifyService spotifyService, IWeightingService weightingService)
        {
            SpotifyService = spotifyService;
            _weightingService = weightingService;
        }

        [HttpGet("getplayerconnection")]
        public IActionResult GetPlayerConnection(string deviceId, bool play)
        {
            SpotifyService.GetPlayerConnection(deviceId, play);

            return Ok();
        }

        [HttpGet("skipped/{trackId}")]
        public IActionResult Skipped(string trackId)
        {
            var user = SpotifyService.Connect();

            _weightingService.ReduceWeight(user.Id,  trackId);
            return Ok();
        }

        [HttpGet("playsong/{trackId}")]
        public IActionResult PlaySong(string trackId)
        {
            var user = SpotifyService.Connect();

            _weightingService.AddWeight(user.Id, trackId);
            return Ok();
        }
    }
}
