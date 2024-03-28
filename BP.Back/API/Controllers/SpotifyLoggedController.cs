using System.Security.Claims;
using ExternalServices.Spotify;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SpotifyLoggedController : ControllerBase
    {
        public ISpotifyService SpotifyService { get; set; }
    }
}