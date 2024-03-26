using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models.User;
using Database.Interfaces;
using Database.Models;
using Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
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