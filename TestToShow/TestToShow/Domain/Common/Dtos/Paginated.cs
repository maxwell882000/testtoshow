using TestToShow.Domain.Common.Entities;

namespace TestToShow.Domain.Common.Dtos;

public class Paginated<T> where T : BaseEntity
{
    public int Total { get; set; }
    public List<T> Items { get; set; }
}