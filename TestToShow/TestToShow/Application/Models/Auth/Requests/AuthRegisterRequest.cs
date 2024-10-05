using System.ComponentModel.DataAnnotations;

namespace TestToShow.Application.Models.Auth.Requests;

public class AuthRegisterRequest
{
    [Required] public string? UserName { get; set; }

    [Required] public string? Name { get; set; }

    [Required] public string? Password { get; set; }

    [Required] public string? RepeatPassword { get; set; }
}