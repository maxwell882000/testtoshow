using TestToShow.Application.Models.Common;

namespace TestToShow.Application.Common.Extensions;

public static class HttpContextGenerateError
{
    public static async Task GenerateError(this HttpContext context, int statusCode, ErrorModel error)
    {
        context.Response.StatusCode = statusCode;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(error);
    }
}