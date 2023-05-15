using BugTracker.Domain.Entities;

namespace BugTracker.Domain.IRepositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllProjectsAsync(string userId);
        Task<Project> GetProjectAsync(int projectId);
        Task<Project> AddProject(Project project, string userId);
        Task<Project> UpdateProjectAsync(Project project);
        Task DeleteProjectAsync(int projectId);
    }
}
