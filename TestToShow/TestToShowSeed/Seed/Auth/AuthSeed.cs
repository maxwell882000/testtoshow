using AutoMapper;
using Microsoft.AspNetCore.Identity;
using TestToShowSeed.Dto;
using TestToShowSeed.Seed.Common;

namespace TestToShowSeed.Seed.Auth;

public class AuthSeed(
    UserManager<TestToShow.Domain.Auth.Entities.Auth> userManager,
    IMapper mapper)
    : BaseSeed<List<AuthSeedDto>>("seed_auth.json")
{
    protected override async Task SeedAsync(List<AuthSeedDto> authDtos)
    {
        foreach (var auth in authDtos)
        {
            var user = mapper.Map<TestToShow.Domain.Auth.Entities.Auth>(auth);
            await userManager.CreateAsync(user, auth.Password);
        }
    }
}