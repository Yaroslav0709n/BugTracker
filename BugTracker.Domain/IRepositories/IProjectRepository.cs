using BugTracker.Domain.Entities;

namespace BugTracker.Domain.IRepositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllProjects();
        Task<Project> GetById(int id);
        Task<Project> AddProject(Project project);
        Task UpdateProject(Project project);
        Task DeleteProject(int id);
    }
}
