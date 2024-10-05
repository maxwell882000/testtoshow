namespace TestToShow.Domain.Auth.Repository;

public interface IAuthRepository
{
    public Task<List<Entities.Auth>> GetAll();

    public Task AddRange(List<Entities.Auth> entities);

    public Task SetActivityRange(List<Guid> entities, bool isActive);
}