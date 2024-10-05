using System.ComponentModel.DataAnnotations;

namespace TestToShow.Application.Models.Auth.Requests;

public class AuthLoginRequest
{
    [Required] public string? Username { get; set; }

    [Required] public string? Password { get; set; }
}