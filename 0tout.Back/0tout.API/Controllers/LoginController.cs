using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using _0tout.Services.Interfaces;
using _0tout.DB.Interfaces;
using _0tout.API.Models.Login;
using _0tout.API.Controllers;
using _0tout.DB.Models;

namespace _0tout.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ZeroController
    {
        private ISecurityService SecurityService { get; }
        private IZeroUnitOfWork ZeroUnitOfWork { get; }

        public LoginController(ISecurityService securityService, IZeroUnitOfWork zeroUnitOfWork)
        {
            SecurityService = securityService;
            ZeroUnitOfWork = zeroUnitOfWork;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginPostModel model)
        {
            IActionResult response = Unauthorized();

            var user = ZeroUnitOfWork.UserRepository.GetUserByEmailAndPassword(model.Email, SecurityService.HashPassword(model.Password));

            if (user != null)
            {
                var tokenString = SecurityService.GenerateJSONWebToken(user.Id);
                response = Ok(tokenString );
            }

            return response;
        }
    }
}
