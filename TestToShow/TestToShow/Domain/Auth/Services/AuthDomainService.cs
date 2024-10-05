using System.Transactions;
using TestToShow.Domain.Auth.Repository;

namespace TestToShow.Domain.Auth.Services;

public class AuthDomainService(IAuthRepository authRepository) : IAuthDomainService
{
    public async Task<List<Entities.Auth>> GetAll()
    {
        return await authRepository.GetAll();
    }

    public async Task AddRange(List<Entities.Auth> entities)
    {
        await authRepository.AddRange(entities);
    }

    public async Task SetActivityRange(List<Entities.Auth> entities)
    {
        var activeUsersId = entities.Where(x => x.IsActive).Select(e => e.Id).ToList();
        var inActiveUsersId = entities.Where(x => !x.IsActive).Select(e => e.Id).ToList();
        using var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        await authRepository.SetActivityRange(activeUsersId, true);
        await authRepository.SetActivityRange(inActiveUsersId, false);
        transactionScope.Complete();
    }
}