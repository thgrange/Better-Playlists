using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Attributes;
using Database.Interfaces;
using Database.Models;
using ExternalServices.Spotify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Security;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[SpotifyAuthenticator]
	public class RoomController : ControllerBase
	{
		public RoomController()
		{
		}

		[HttpPost("createroom")]
		public IActionResult CreateRoom()
		{
			return Ok();
		}
	}
}