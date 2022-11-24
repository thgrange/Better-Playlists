using Microsoft.AspNetCore.Mvc;

namespace SECRET_APP.Interfaces
{
	public interface IHandler<T> where T : class
	{
		IActionResult Handle(T query);
	}
}
