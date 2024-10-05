using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
using TestToShow.Domain.Auth.Repository;
using TestToShow.Infrastructure.Persistence.DbContexts;

namespace TestToShow.Infrastructure.Repositories.Auth;

public class AuthRepository(AuthDbContext context) : IAuthRepository
{
    public Task<List<Domain.Auth.Entities.Auth>> GetAll()
    {
        return context.Users.AsNoTracking().ToListAsync();
    }

    public async Task AddRange(List<Domain.Auth.Entities.Auth> entities)
    {
        await context.BulkInsertAsync(entities);
    }

    public async Task SetActivityRange(List<Guid> entities, bool isActive)
    {
        await context.Users.Where(a => entities.Contains(a.Id))
            .ExecuteUpdateAsync(s => s.SetProperty(e => e.IsActive, isActive));
    }
}