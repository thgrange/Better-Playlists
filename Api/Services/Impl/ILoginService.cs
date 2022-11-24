using Database.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
	public interface ILoginService
	{
		void SignIn(HttpContext httpContext, User user);
		void SignOut(HttpContext httpContext);
	}
}
