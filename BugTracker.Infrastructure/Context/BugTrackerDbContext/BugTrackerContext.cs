using BugTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Infrastructure.Context.ApplicationDbContext
{
    public class BugTrackerContext:DbContext
    {
        public BugTrackerContext(DbContextOptions<BugTrackerContext> options):base(options)   
        {
        }

        public DbSet<Project> Project { get; set; }
        public DbSet<ProjectUser> ProjectUser { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
        public DbSet<TicketUser> TicketUser { get; set; }
        public DbSet<Commentary> Commentary { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
