namespace YouthAIF.Api.DTOs;

public record LoginRequestDto(string Password);

public record LoginResponseDto(string Token, int ExpiresInMinutes);
