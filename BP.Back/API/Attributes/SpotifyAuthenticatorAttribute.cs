using API.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Attributes
{
    public class SpotifyAuthenticatorAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var controller = context.Controller as SpotifyLoggedController;
            if (controller != null)
            {
                var bearer = context.HttpContext?.Request?.Headers?.Authorization.ToString();

                if (!string.IsNullOrEmpty(bearer))
                {
                    bearer = bearer.Replace("Bearer ", "");
                    controller.SpotifyService.IdentiySpotifyUser(bearer);
                }
            }

            base.OnActionExecuting(context);
        }
    }
}
