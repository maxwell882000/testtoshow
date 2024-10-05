using System.Text.RegularExpressions;

namespace TestToShow.Api.ControllerOptions.Conventions;

public class SnakeCaseRoutingConvention : IOutboundParameterTransformer
{
    public string? TransformOutbound(object? value)
    {
        if (value == null)
        {
            return null;
        }

        // Convert the value to snake_case
        return Regex.Replace(value.ToString()!,
            "([a-z])([A-Z])",
            "$1-$2").ToLower();
    }
}