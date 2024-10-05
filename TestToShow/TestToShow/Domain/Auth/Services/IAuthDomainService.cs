namespace TestToShow.Domain.Auth.Services;

public interface IAuthDomainService
{
    Task<List<Entities.Auth>> GetAll();
    Task AddRange(List<Entities.Auth> entities);
    Task SetActivityRange(List<Entities.Auth> entities);
}