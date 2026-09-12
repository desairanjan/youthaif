using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YouthAIF.Api.Data;
using YouthAIF.Api.DTOs;
using YouthAIF.Api.Models;

namespace YouthAIF.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsletterController : ControllerBase
{
    private readonly YouthAIFDbContext _db;

    public NewsletterController(YouthAIFDbContext db)
    {
        _db = db;
    }

    [HttpPost("subscribe")]
    public async Task<IActionResult> Subscribe([FromBody] NewsletterSubscribeDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Email))
            return BadRequest(new { message = "Email is required." });

        var email = dto.Email.Trim().ToLowerInvariant();
        var existing = await _db.NewsletterSubscribers
            .FirstOrDefaultAsync(s => s.Email == email && s.NewsletterType == dto.NewsletterType);

        if (existing is not null)
            return Ok(new { message = "You are already subscribed to this newsletter." });

        _db.NewsletterSubscribers.Add(new NewsletterSubscriber
        {
            Email = email,
            FullName = dto.FullName?.Trim(),
            NewsletterType = dto.NewsletterType
        });

        await _db.SaveChangesAsync();

        return Ok(new { message = "Successfully subscribed!" });
    }
}
