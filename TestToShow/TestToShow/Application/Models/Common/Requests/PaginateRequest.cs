namespace TestToShow.Application.Models.Common.Requests;

public class PaginateRequest
{
    public int Page { get; set; } = 1;
    public int Size { get; set; } = 10;
}