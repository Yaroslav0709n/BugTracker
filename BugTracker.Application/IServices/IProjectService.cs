using BugTracker.Application.Dtos;
using BugTracker.Domain.Entities;

namespace BugTracker.Application.IServices
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllProjects();
        Task<Project> GetById(int id);
        Task<Project> CreateProject(string userId, ProjectDto project);
        Task UpdateProject(ProjectDto project);
        Task DeleteProject(int id);
    }
}
