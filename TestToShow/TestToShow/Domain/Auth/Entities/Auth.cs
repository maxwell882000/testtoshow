using System.Security.Claims;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Identity;

namespace TestToShow.Domain.Auth.Entities;

public class Auth : IdentityUser<Guid>
{
    public bool IsActive { get; set; }

    public ClaimsPrincipal GetPrincipal => new(
        new ClaimsIdentity(
            new[]
            {
                new Claim(ClaimTypes.MobilePhone, UserName!),
                new Claim(ClaimTypes.NameIdentifier, Id.ToString()),
            },
            BearerTokenDefaults.AuthenticationScheme
        )
    );
}