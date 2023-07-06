using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _0tout.API.Models.User;
using _0tout.DB.Interfaces;
using _0tout.DB.Models;
using _0tout.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace _0tout.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ZeroController
    {
        private ISecurityService SecurityService { get; }
        private IZeroUnitOfWork ZeroUnitOfWork { get; }

        public UserController(ISecurityService securityService, IZeroUnitOfWork zeroUnitOfWork)
        {
            SecurityService = securityService;
            ZeroUnitOfWork = zeroUnitOfWork;
        }

        [HttpPost]
        public IActionResult Register([FromBody] UserPostModel model)
        {
            if (!ZeroUnitOfWork.UserRepository.IsAnyUserWithSameEmail(model.Email))
            {
                ZeroUnitOfWork.UserRepository.Add(new User
                {
                    Id = Guid.NewGuid(),
                    Email = model.Email,
                    Password = SecurityService.HashPassword(model.Password),
                    Firstname = model.Firstname,
                    Lastname = model.Lastname,
                    BirthDate = model.BirthDate,
                    CreationDate = DateTime.UtcNow,
                    ModificationDate = DateTime.UtcNow,
                    ProfilePicture = string.Empty
                });
            }
            else
                return BadRequest();

            return Ok();
        }

        [Authorize]
        [HttpGet("connectedUser")]
        public IActionResult GetUser()
        {
            var user = ZeroUnitOfWork.UserRepository.GetById(this.UserId);

            if (user != null)
                return Ok(user);
            return BadRequest();
        }
    }
}