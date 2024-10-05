using TestToShow.Application.Common.Extensions;
using TestToShow.Application.Models.Common;
using TestToShow.Application.Services.Auth;

namespace TestToShow.Application.Common.Middlewares;

public class UserActiveMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        if (context.User.Identity?.IsAuthenticated == true)
        {
            var authService = context.RequestServices.GetService<IAuthService>();
            var user = await authService.GetCurrentAuthUser();
            if (user?.IsActive == false)
            {
                await context.GenerateError(StatusCodes.Status401Unauthorized, new ErrorModel
                {
                    Message = "We could not log you in. Please check your username/password and try again.",
                    StackTrace = "",
                    Path = context.Request.Path.ToString(),
                    Errors = new Dictionary<string, string> { }
                });
                return;
            }
        }

        await next(context);
    }
}