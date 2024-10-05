using TestToShow.Domain.Auth.Services;

namespace TestToShow.DependencyInjections;

public static class DomainDI
{
    public static void AddDomainServices(this IServiceCollection services)
    {
        services.AddTransient<IAuthDomainService, AuthDomainService>();
    }
}