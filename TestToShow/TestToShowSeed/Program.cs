using Microsoft.EntityFrameworkCore;
using Seeds.Seed.Common;
using TestToShow.DependencyInjections;
using TestToShow.Infrastructure.Persistence.DbContexts;
using TestToShowSeed.Seed.Auth;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddAuth();
builder.Services.AddScoped<ISeed, AuthSeed>();

builder.Services.AddDatabases(builder.Configuration);
builder.Services.AddRepositories();
builder.Services.AddCommonExtensions();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AuthDbContext>();
    db.Database.Migrate();
}

using (var scope = app.Services.CreateScope())
{
    var seed = scope.ServiceProvider.GetServices<ISeed>();
    foreach (var seedItem in seed)
        await seedItem.SeedAsync();
}