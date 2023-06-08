using BugTracker.Domain.Entities;
using BugTracker.Domain.Entities.Identity;
using BugTracker.Domain.IRepositories;
using BugTracker.Infrastructure.Context;
using BugTracker.Infrastructure.Context.ApplicationDbContext;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Infrastructure.Repositories
{
    public class ProjectUserRepository : IProjectUserRepository
    {
        private readonly BugTrackerContext _context;
        private readonly IdentityBugTrackerContext _identityContext;
        public ProjectUserRepository(BugTrackerContext context, IdentityBugTrackerContext identityBugTrackerContext)
        {
            _context = context;
            _identityContext = identityBugTrackerContext;
        }

        public async Task<ProjectUser> CreateUserProjectAsync(ProjectUser projectUser)
        {
            await _context.ProjectUser.AddAsync(projectUser);
            await _context.SaveChangesAsync();
            return projectUser;
        }

        public async Task<IEnumerable<ApplicationUser>> GetAllProjectsUserAsync(int projectId)
        {
            return await _context.ProjectUser
                        .Include(x => x.ApplicationUser)
                        .Where(x => x.ProjectId == projectId)
                        .Select(x => x.ApplicationUser)
                        .ToListAsync();
        }

        public async Task<IEnumerable<ApplicationUser>> GetNonProjectsUserAsync(int projectId)
        {
            var projectUserIds = await _context.ProjectUser.Where(x => x.ProjectId == projectId).Select(x => x.ApplicationUserId).ToListAsync();
            var nonProjectUsers = await _identityContext.Users.Where(x => !projectUserIds.Contains(x.Id)).ToListAsync();
            return nonProjectUsers;
        }

        public async Task RemoveFromProjectAsync(string userId, int projectId)
        {
            var user = await _context.ProjectUser.FirstOrDefaultAsync(x => x.ApplicationUserId == userId);
            _context.ProjectUser.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}
