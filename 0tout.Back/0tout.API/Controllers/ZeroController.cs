using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace _0tout.API.Controllers
{
    public class ZeroController : ControllerBase
    {
        private Guid _userId = Guid.Empty;
        protected Guid UserId
        {   
            get
            {
                if (_userId == Guid.Empty)
                {
                    var userid = Guid.Parse(this.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                    _userId = userid;
                }
                return _userId;
            }
        }
    }
}