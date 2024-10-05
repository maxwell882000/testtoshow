using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TestToShow.Application.Common;
using TestToShow.Application.Models.Auth.Common;
using TestToShow.Application.Models.Auth.Requests;
using TestToShow.Application.Services.Auth;

namespace TestToShow.Api.Controllers;

public class UserController(IAuthService authService) : AppBaseController
{
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [HttpGet]
    public async Task<ActionResult<AuthDto>> GetUser()
    {
        return Ok((await authService.GetCurrentAuthUser()));
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [HttpGet("all")]
    public async Task<ActionResult<List<AuthDto>>> GetUsers()
    {
        return Ok(await authService.GetAllUsers());
    }

    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [HttpPut("set-activity")]
    public async Task<IActionResult> UpdateUser([FromBody] SetUserActivityRequest setUserActivity)
    {
        await authService.SetUserActivity(setUserActivity);
        return NoContent();
    }
}