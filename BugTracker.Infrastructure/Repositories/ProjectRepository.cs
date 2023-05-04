using BugTracker.Domain.Entities;
using BugTracker.Domain.IRepositories;
using BugTracker.Infrastructure.Context.ApplicationDbContext;

namespace BugTracker.Infrastructure.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ApplicationContext _context;
        public ProjectRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<Project> AddProject(Project project)
        {
            await _context.Project.AddAsync(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public Task DeleteProject(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Project>> GetAllProjects()
        {
            throw new NotImplementedException();
        }

        public Task<Project> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateProject(Project project)
        {
            throw new NotImplementedException();
        }
    }
}
