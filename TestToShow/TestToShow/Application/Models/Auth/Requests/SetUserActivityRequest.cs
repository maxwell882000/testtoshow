using TestToShow.Application.Models.Auth.Common;

namespace TestToShow.Application.Models.Auth.Requests;

public class SetUserActivityRequest
{
    public List<AuthDto> Users { get; set; }
}