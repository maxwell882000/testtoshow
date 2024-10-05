using TestToShow.Domain.Auth.Entities;
using TestToShow.Infrastructure.Persistence.DbContexts;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using TestToShow.Domain.Auth.Repository;
using TestToShow.Infrastructure.Repositories.Auth;

namespace TestToShow.DependencyInjections;

public static class InfrastructureDi
{
    public static void AddAuth(this IServiceCollection services)
    {
        services.AddIdentity<Auth, IdentityRole<Guid>>()
            .AddEntityFrameworkStores<AuthDbContext>()
            .AddDefaultTokenProviders();
        services.AddAuthorization(options =>
        {
            options.DefaultPolicy = new AuthorizationPolicyBuilder()
                .AddAuthenticationSchemes(BearerTokenDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .Build();
        });
        services
            .AddAuthentication(cfg =>
            {
                cfg.DefaultAuthenticateScheme = BearerTokenDefaults.AuthenticationScheme;
                cfg.DefaultChallengeScheme = BearerTokenDefaults.AuthenticationScheme;
                cfg.DefaultSignInScheme = BearerTokenDefaults.AuthenticationScheme;
                cfg.DefaultScheme = BearerTokenDefaults.AuthenticationScheme;
                cfg.DefaultForbidScheme = BearerTokenDefaults.AuthenticationScheme;
            })
            .AddBearerToken();
    }

    public static void AddDatabases(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetValue<string>("Database:MsSQL:ConnectionString");
        Console.WriteLine(connectionString);
        services.AddDbContextPool<AuthDbContext>(options =>
            options.UseSqlServer(connectionString, x =>
                    x.MigrationsHistoryTable(HistoryRepository.DefaultTableName,
                        schema: "auth"))
                .UseSnakeCaseNamingConvention());
    }

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddTransient<IAuthRepository, AuthRepository>();
    }

    public static void AddServices(this IServiceCollection services)
    {
    }

    public static void AddInfraOptions(this IServiceCollection services, IConfiguration configuration)
    {
    }
}