using TestToShow.Application.Common.Exceptions;
using TestToShow.Application.Common.Extensions;
using TestToShow.Application.Models.Common;
using TestToShow.Domain.Common.Exceptions;

namespace TestToShow.Application.Common.Middlewares;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (AppValidationException ex)
        {
            logger.LogError($"App Validation Message: {ex.Message}\n Stack: {ex.StackTrace}");
            await context.GenerateError(StatusCodes.Status400BadRequest, new ErrorModel
            {
                Message = ex.Message,
                StackTrace = ex.StackTrace,
                Path = context.Request.Path.ToString(),
                Errors = ex.Errors
            });
        }
        catch (Exception ex) when (ex is AppValidationException or DomainRuleException)
        {
            logger.LogError($"App Validation Message: {ex.Message}\n Stack: {ex.StackTrace}");
            await context.GenerateError(StatusCodes.Status400BadRequest, new ErrorModel
            {
                Message = ex.Message,
                StackTrace = ex.StackTrace,
                Path = context.Request.Path.ToString()
            });
        }
        catch (Exception ex)
        {
            logger.LogError("Exceptions Message: " + ex.Message + "\n Stack: " + ex.StackTrace);
            await context.GenerateError(StatusCodes.Status500InternalServerError, new ErrorModel()
                { Message = ex.Message, StackTrace = ex.StackTrace, Path = context.Request.Path.ToString() });
        }
    }
}