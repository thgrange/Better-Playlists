using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;
using System.Threading.Tasks;
using API.Attributes;
using API.Models.Login;
using Database.Interfaces;
using Database.Models;
using ExternalServices.Spotify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Services.Security;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class TokenController : ControllerBase
	{
		private IConfiguration _configuration;

		public TokenController(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		[HttpPost("gettokens")]
		public IActionResult GetTokens(TokenPostModel model)
		{
			var plainTextBytes = System.Text.Encoding.UTF8.GetBytes($"{_configuration["Client:Id"]}:{_configuration["Client:Secret"]}");
			var basic = System.Convert.ToBase64String(plainTextBytes);

			var httpClient = new HttpClient
			{
				BaseAddress = new Uri("https://accounts.spotify.com")
			};

			httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", basic);

			var formUrlEncodedBody = new FormUrlEncodedContent(new Dictionary<string, string>
			{
				{ "grant_type", "authorization_code" },
				{ "redirect_uri", model.RedirectUri },
				{ "code", model.Code }
			});

			var res = httpClient.PostAsync("/api/token", formUrlEncodedBody).Result;

			var tokens = res.Content.ReadFromJsonAsync<TokenResult>().Result;

			return Ok(tokens);
		}

		[HttpPost("getrefreshedtoken")]
		public IActionResult GetRefreshedToken(RefreshTokenPostModel model)
		{
			var plainTextBytes = System.Text.Encoding.UTF8.GetBytes($"{_configuration["Client:Id"]}:{_configuration["Client:Secret"]}");
			var basic = System.Convert.ToBase64String(plainTextBytes);

			var httpClient = new HttpClient
			{
				BaseAddress = new Uri("https://accounts.spotify.com")
			};

			httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", basic);

			var formUrlEncodedBody = new FormUrlEncodedContent(new Dictionary<string, string>
			{
				{ "grant_type", "refresh_token" },
				{ "redirect_uri", model.RedirectUri },
				{ "refresh_token", model.RefreshToken }
			});

			var res = httpClient.PostAsync("/api/token", formUrlEncodedBody).Result;

			var tokens = res.Content.ReadFromJsonAsync<TokenResult>().Result;

			return Ok(tokens);
		}
	}
}