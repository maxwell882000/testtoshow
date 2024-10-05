using TestToShow.Domain.Auth.Entities;
using TestToShowSeed.Dto;

namespace TestToShowSeed.Profiles;

public class AuthProfile : AutoMapper.Profile
{
    public AuthProfile()
    {
        CreateMap<AuthSeedDto, Auth>();
    }
}