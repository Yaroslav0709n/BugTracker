using BugTracker.Domain.Entities;
using BugTracker.Domain.IRepositories;
using BugTracker.Infrastructure.Context.ApplicationDbContext;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Infrastructure.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly BugTrackerContext _context;
        public ProjectRepository(BugTrackerContext context)
        {
            _context = context;
        }

        public async Task<Project> AddProject(Project project, string userId)
        {
            await _context.Project.AddAsync(project);
            await _context.SaveChangesAsync();

            var projectUser = new ProjectUser
            {
                ProjectId = project.Id,
                ApplicationUserId = userId,
            };

            await _context.ProjectUser.AddAsync(projectUser);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task DeleteProjectAsync(int projectId)
        {
            var project = await _context.Project.FindAsync(projectId);
            
            if (project != null)
                _context.Project.Remove(project);

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Project>> GetAllProjectsAsync(string userId)
        {
            return await _context.ProjectUser
                .Include(pu => pu.Project)
                .Where(pu => pu.ApplicationUserId == userId)
                .Select(pu => pu.Project)
                .ToListAsync();
        }

        public async Task<Project> GetProjectAsync(int projectId)
        {
            return await _context.Project.FindAsync(projectId);
        }

        public async Task<Project> UpdateProjectAsync(Project project)
        {
            _context.Project.Update(project);
            await _context.SaveChangesAsync();
            return project;
        }
    }
}
