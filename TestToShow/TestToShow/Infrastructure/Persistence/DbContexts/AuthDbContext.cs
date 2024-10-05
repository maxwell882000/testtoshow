using TestToShow.Domain.Auth.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TestToShow.Infrastructure.Persistence.DbContexts;

public class AuthDbContext(DbContextOptions<AuthDbContext> options)
    : IdentityDbContext<Auth, IdentityRole<Guid>, Guid>(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.HasDefaultSchema("auth");
    }
}