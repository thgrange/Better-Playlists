using Microsoft.AspNetCore.Mvc;
using SECRET_APP.Interfaces;

namespace SECRET_APP.CQS.Login
{
	public class LoginPostHandler : IHandler<LoginPost>
	{
		public IActionResult Handle(LoginPost query)
		{
			throw new NotImplementedException();
		}
	}
}
