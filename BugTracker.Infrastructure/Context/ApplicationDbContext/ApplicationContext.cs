using BugTracker.Domain.Entities;
using BugTracker.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace BugTracker.Infrastructure.Context.ApplicationDbContext
{
    public class ApplicationContext:DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options):base(options)   
        {
        }

        public DbSet<Project> Project { get; set; }
        public DbSet<ProjectUser> ProjectUser { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
        public DbSet<TicketUser> TicketUser { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
