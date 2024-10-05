using TestToShow.Domain.Common.Entities;

namespace TestToShow.Domain.Common.Specifications;

public class QueryAll<T>: ISpecification<T> where T : BaseEntity
{
    public IQueryable<T> Apply(IQueryable<T> query)
    {
        return query;
    }
}