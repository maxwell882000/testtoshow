using TestToShow.Application.Models.Auth.Common;
using AutoMapper;
using TestToShow.Application.Models.Auth.Requests;

namespace TestToShow.Application.Profiles.Auth;

public class AuthProfile : Profile
{
    public AuthProfile()
    {
        CreateMap<AuthRegisterRequest, Domain.Auth.Entities.Auth>();
        CreateMap<Domain.Auth.Entities.Auth, AuthDto>().ReverseMap();
        CreateMap<SetUserActivityRequest, Domain.Auth.Entities.Auth>();
    }
}