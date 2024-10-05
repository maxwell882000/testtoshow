using TestToShow.Application.Common.Middlewares;
using TestToShow.DependencyInjections;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddAuth();
builder.Services.AddDatabases(builder.Configuration);
builder.Services.AddRepositories();
builder.Services.AddApplicationServices();
builder.Services.AddDomainServices();
builder.Services.AddDomainServices();
builder.Services.AddCommonExtensions();
builder.Services.AddServices();
builder.Services.AddAppOptions(builder.Configuration);
builder.Services.AddInfraOptions(builder.Configuration);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        corsPolicyBuilder =>
        {
            corsPolicyBuilder
                .WithOrigins("http://localhost:8081")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});


var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.DisplayRequestDuration());
}

app.UseStaticFiles();

app.UseMiddlewares();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.UseMiddleware<UserActiveMiddleware>();
app.MapControllers();

app.Run();