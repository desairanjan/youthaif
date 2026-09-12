using Microsoft.EntityFrameworkCore;
using YouthAIF.Api.Models;

namespace YouthAIF.Api.Data;

public class YouthAIFDbContext : DbContext
{
    public YouthAIFDbContext(DbContextOptions<YouthAIFDbContext> options) : base(options)
    {
    }

    public DbSet<SevathonVisitor> SevathonVisitors => Set<SevathonVisitor>();
    public DbSet<NewsletterSubscriber> NewsletterSubscribers => Set<NewsletterSubscriber>();
}
