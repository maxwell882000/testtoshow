namespace TestToShow.Application.Models.Common.Responses;

public class PaginatedResponse<T>
{
    public int Total { get; set; }
    public List<T> Items { get; set; }
}