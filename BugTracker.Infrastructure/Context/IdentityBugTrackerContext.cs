using BugTracker.Domain.Entities;
using BugTracker.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace BugTracker.Infrastructure.Context
{
    public class IdentityBugTrackerContext : IdentityDbContext<ApplicationUser>
    {
        public IdentityBugTrackerContext(DbContextOptions<IdentityBugTrackerContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
