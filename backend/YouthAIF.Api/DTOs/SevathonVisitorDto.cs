namespace YouthAIF.Api.DTOs;

public record SevathonVisitorCreateDto(
    string FullName,
    string Email,
    string? Phone,
    string? Organization,
    string? Interests,
    bool WantsNewsletter
);

public record SevathonVisitorResponseDto(
    int Id,
    string FullName,
    string Email,
    string? Phone,
    string? Organization,
    string? Interests,
    bool WantsNewsletter,
    DateTime CheckedInAt
);
