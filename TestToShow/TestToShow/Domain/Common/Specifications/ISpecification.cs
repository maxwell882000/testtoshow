using TestToShow.Domain.Common.Entities;

namespace TestToShow.Domain.Common.Specifications;

public interface ISpecification<T>
{
    public IQueryable<T> Apply(IQueryable<T> query);
}