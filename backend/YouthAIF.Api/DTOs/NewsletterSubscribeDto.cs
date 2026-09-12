namespace YouthAIF.Api.DTOs;

public record NewsletterSubscribeDto(
    string Email,
    string? FullName,
    string NewsletterType
);
