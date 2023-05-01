using BugTracker.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Infrastructure.Context
{
    public class IdentityBugTrackerContext : IdentityDbContext<ApplicationUser>
    {
        public IdentityBugTrackerContext(DbContextOptions<IdentityBugTrackerContext> options) : base(options)
        {
        }

        public DbSet<ApplicationUser> User { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
