using Database.Interfaces.Repositories;
using Database.Models.Context;
using Database.Repositories;
using Microsoft.AspNetCore.Mvc;
using SECRET_APP.CQS.Login;
using SECRET_APP.Interfaces;
using Services.Impl;
using Services.Interfaces;

namespace SECRET_APP.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class LoginController : ControllerBase
	{
		private IUnitOfWork UnitOfWork { get; set; }
		private ILoginService LoginService { get; set; }
		public IHandler<LoginPost> LoginPostHandler { get; set; }

		public LoginController(IUnitOfWork unitOfWork, ILoginService loginService)
		{
			UnitOfWork= unitOfWork;
			LoginService= loginService;
		}

		[HttpPost]
		public IActionResult Post(LoginPost model)
		{
			var user = UnitOfWork.UserRepository.Query(x => x.Password == model.Password && x.Email == model.Email).FirstOrDefault();
			LoginService.SignIn(HttpContext, user);
			return Ok(HttpContext.User);
		}

		[HttpGet]
		public IActionResult Get()
		{
			return Ok(HttpContext.User);
		}
	}
}