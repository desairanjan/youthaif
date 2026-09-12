namespace YouthAIF.Api.Models;

public class SevathonVisitor
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Organization { get; set; }
    public string? Interests { get; set; }
    public bool WantsNewsletter { get; set; }
    public DateTime CheckedInAt { get; set; } = DateTime.UtcNow;
}
