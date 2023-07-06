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
    public class TestController : ZeroController
    {

        public TestController(ISecurityService securityService, IZeroUnitOfWork zeroUnitOfWork)
        {
        }

        [HttpPost]
        public IActionResult Post(string access_token, string token_type, string expires_in, string state)
        {
            return Ok();
        }
    }
}