using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using YouthAIF.Api.DTOs;

namespace YouthAIF.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;

    public AuthController(IConfiguration config)
    {
        _config = config;
    }

    [HttpPost("login")]
    public ActionResult<LoginResponseDto> Login([FromBody] LoginRequestDto dto)
    {
        var adminPassword = _config["Admin:Password"];
        if (string.IsNullOrEmpty(adminPassword))
            return StatusCode(503, new { message = "Admin login is not configured." });

        if (string.IsNullOrWhiteSpace(dto.Password) || dto.Password != adminPassword)
            return Unauthorized(new { message = "Invalid password." });

        var expiresMinutes = _config.GetValue("Jwt:ExpiresMinutes", 480);
        var token = CreateToken(expiresMinutes);

        return Ok(new LoginResponseDto(token, expiresMinutes));
    }

    private string CreateToken(int expiresMinutes)
    {
        var key = _config["Jwt:Key"]
            ?? throw new InvalidOperationException("Jwt:Key is not configured.");

        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Role, "Admin"),
            new Claim(ClaimTypes.Name, "YouthAIF-Admin")
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
