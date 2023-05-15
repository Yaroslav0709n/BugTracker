using BugTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Infrastructure.Context.ApplicationDbContext
{
    public class ApplicationContext:DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options):base(options)   
        {
        }

        public DbSet<Project> Project { get; set; }
        public DbSet<ProjectUser> ProjectUser { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
