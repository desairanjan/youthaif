using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YouthAIF.Api.Data;
using YouthAIF.Api.DTOs;
using YouthAIF.Api.Models;

namespace YouthAIF.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SevathonController : ControllerBase
{
    private readonly YouthAIFDbContext _db;

    public SevathonController(YouthAIFDbContext db)
    {
        _db = db;
    }

    [HttpPost("check-in")]
    public async Task<ActionResult<SevathonVisitorResponseDto>> CheckIn([FromBody] SevathonVisitorCreateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.FullName) || string.IsNullOrWhiteSpace(dto.Email))
            return BadRequest(new { message = "Full name and email are required." });

        var visitor = new SevathonVisitor
        {
            FullName = dto.FullName.Trim(),
            Email = dto.Email.Trim().ToLowerInvariant(),
            Phone = dto.Phone?.Trim(),
            Organization = dto.Organization?.Trim(),
            Interests = dto.Interests?.Trim(),
            WantsNewsletter = dto.WantsNewsletter,
            CheckedInAt = DateTime.UtcNow
        };

        _db.SevathonVisitors.Add(visitor);

        if (dto.WantsNewsletter)
        {
            var existing = await _db.NewsletterSubscribers
                .FirstOrDefaultAsync(s => s.Email == visitor.Email);

            if (existing is null)
            {
                _db.NewsletterSubscribers.Add(new NewsletterSubscriber
                {
                    Email = visitor.Email,
                    FullName = visitor.FullName,
                    NewsletterType = "General"
                });
            }
        }

        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStats), new SevathonVisitorResponseDto(
            visitor.Id,
            visitor.FullName,
            visitor.Email,
            visitor.Phone,
            visitor.Organization,
            visitor.Interests,
            visitor.WantsNewsletter,
            visitor.CheckedInAt
        ));
    }

    [HttpGet("stats")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<object>> GetStats()
    {
        var totalVisitors = await _db.SevathonVisitors.CountAsync();
        var newsletterSignups = await _db.SevathonVisitors.CountAsync(v => v.WantsNewsletter);

        return Ok(new
        {
            eventName = "Sevathon 2026",
            eventDate = "2026-09-20",
            totalVisitors,
            newsletterSignups
        });
    }

    [HttpGet("visitors")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<SevathonVisitorResponseDto>>> GetVisitors()
    {
        var visitors = await _db.SevathonVisitors
            .OrderByDescending(v => v.CheckedInAt)
            .Select(v => new SevathonVisitorResponseDto(
                v.Id,
                v.FullName,
                v.Email,
                v.Phone,
                v.Organization,
                v.Interests,
                v.WantsNewsletter,
                v.CheckedInAt))
            .ToListAsync();

        return Ok(visitors);
    }
}
