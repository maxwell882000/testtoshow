using System.Security.Claims;
using TestToShow.Application.Models.Auth.Common;
using TestToShow.Application.Models.Auth.Requests;
using TestToShow.Application.Models.Auth.Responses;

namespace TestToShow.Application.Services.Auth;

public interface IAuthService
{
    public Task<ClaimsPrincipal> Register(AuthRegisterRequest request);
    public Task<ClaimsPrincipal> Login(AuthLoginRequest request);
    public Task<AuthDto?> GetCurrentAuthUser();
    public Task<List<AuthDto>> GetAllUsers();
    public Task SetUserActivity(SetUserActivityRequest request);
    public Guid? GetCurrentAuthUserId();
}