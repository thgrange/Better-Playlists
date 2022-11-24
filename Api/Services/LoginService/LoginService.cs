using Database.Models;
using Database.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Services.Impl
{
	public class LoginService : ILoginService
	{
		public LoginService()
		{

		}
		public async void SignIn(HttpContext httpContext, User user)
		{
			ClaimsIdentity identity = new ClaimsIdentity(this.GetUserClaims(user), CookieAuthenticationDefaults.AuthenticationScheme);
			ClaimsPrincipal principal = new ClaimsPrincipal(identity);

			await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
		}

		public async void SignOut(HttpContext httpContext)
		{
			httpContext.SignOutAsync();
		}

		private IEnumerable<Claim> GetUserClaims(User user)
		{
			List<Claim> claims = new List<Claim>();

			claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
			claims.Add(new Claim(ClaimTypes.Name, user.Firstname));
			claims.Add(new Claim(ClaimTypes.Email, user.Email));
			return claims;
		}
	}
}
