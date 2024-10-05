using TestToShow.Application.Common.Exceptions;
using TestToShow.Shared.Extensions;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TestToShow.Api.ControllerOptions.Filters;

public class ValidationResponseFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            throw new AppValidationException("Ошибка валидации", errors: context
                .ModelState
                .ToDictionary(e => e.Key.ToCamelCase(),
                    e => e.Value!.Errors.Select(e => e.ErrorMessage).First()
                ));
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
    }
}