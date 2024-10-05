using TestToShow.Application.Common;
using TestToShow.Application.Models.Auth.Requests;
using TestToShow.Application.Models.Common;
using TestToShow.Application.Services.Auth;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;
using AuthenticationSchemes = System.Net.AuthenticationSchemes;

namespace TestToShow.Api.Controllers;

public class AuthController(IAuthService authService) : AppBaseController
{
    [ProducesResponseType(StatusCodes.Status201Created)]
    [HttpPost("register")]
    public async Task<SignInResult> Register(
        [FromBody] AuthRegisterRequest request
    )
    {
        var result = await authService.Register(request);
        return SignIn(result);
    }

    [ProducesResponseType(StatusCodes.Status201Created)]
    [HttpPost("login")]
    public async Task<SignInResult> Login(
        [FromBody] AuthLoginRequest request
    )
    {
        var result = await authService.Login(request);
        return SignIn(result);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [HttpGet("log-out")]
    public SignOutResult LogOut()
    {
        return SignOut();
    }


}