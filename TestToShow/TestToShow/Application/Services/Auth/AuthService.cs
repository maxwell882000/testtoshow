using System.Security.Claims;
using System.Transactions;
using AutoMapper;
using TestToShow.Application.Common.Exceptions;
using TestToShow.Application.Models.Auth.Common;
using TestToShow.Application.Models.Auth.Requests;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using TestToShow.Domain.Auth.Services;

namespace TestToShow.Application.Services.Auth;

public class AuthService(
    Microsoft.AspNetCore.Identity.UserManager<Domain.Auth.Entities.Auth> userManager,
    SignInManager<Domain.Auth.Entities.Auth> signInManager,
    IHttpContextAccessor httpContextAccessor,
    IAuthDomainService authDomainService,
    IMapper mapper)
    : IAuthService
{
    public async Task<ClaimsPrincipal> Login(AuthLoginRequest request)
    {
        var result = await signInManager.PasswordSignInAsync(request.Username!, request.Password!, false, false);
        if (result.Succeeded)
        {
            var auth = (await userManager.FindByNameAsync(request.Username!))!;
            if (!auth.IsActive)
                throw new AppValidationException("Incorrect login or password");
            return auth.GetPrincipal;
        }

        throw new AppValidationException("Incorrect login or password");
    }

    public async Task<AuthDto?> GetCurrentAuthUser()
    {
        var user = httpContextAccessor.HttpContext?.User;
        if (user != null && user.Identity.IsAuthenticated)
            return mapper.Map<AuthDto>(await userManager.GetUserAsync(user));
        return null;
    }

    public async Task<List<AuthDto>> GetAllUsers()
    {
        var response = await authDomainService.GetAll();
        return mapper.Map<List<AuthDto>>(response);
    }


    public async Task SetUserActivity(SetUserActivityRequest request)
    {
        await authDomainService.SetActivityRange(mapper.Map<List<Domain.Auth.Entities.Auth>>(request.Users));
    }

    public Guid? GetCurrentAuthUserId()
    {
        var user = httpContextAccessor.HttpContext?.User;
        if (user != null && user.Identity?.IsAuthenticated == true)
        {
            return Guid.Parse(user.Identity.GetUserId());
        }

        return null;
    }


    public async Task<ClaimsPrincipal> Register(AuthRegisterRequest request)
    {
        if (request.Password != request.RepeatPassword)
            throw new AppValidationException("Пароли не совпадают");

        // using var transaction = await dbContext.Database.BeginTransactionAsync();
        using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            var auth = mapper.Map<Domain.Auth.Entities.Auth>(request);
            var result = await userManager.CreateAsync(auth, request.Password!);
            if (result.Succeeded)
            {
                transactionScope.Complete();
                return auth.GetPrincipal;
            }

            throw new AppValidationException(result.Errors.Select(e => e.Description).FirstOrDefault() ??
                                             "Не удалось создать пользователя");
        }
    }
}