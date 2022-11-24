using Microsoft.AspNetCore.Mvc;

namespace SECRET_APP.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class UsersController : ControllerBase
	{
		public UsersController() {}

		[HttpPost]
		public IActionResult Get(Guid id)
		{
			return null;
		}
	}
}