using TestToShow.Domain.Common.Dtos;
using TestToShow.Domain.Common.Entities;
using TestToShow.Domain.Common.Specifications;

namespace TestToShow.Domain.Common.Repositories;

public interface IBaseRepository<T> where T : BaseEntity
{
    public Task<T> Create(T entity);
    public Task<T> Update(T entity);
    public Task<bool> Delete(T entity);
    public Task<List<T>> FindAll(ISpecification<T>? specification = null);
    public Task<T?> FindFirst(ISpecification<T>? specification = null);
    public Task<Paginated<T>> FindPaginated(ISpecification<T> specification, int page = 1, int pageSize = 10);
}