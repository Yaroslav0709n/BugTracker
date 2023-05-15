using BugTracker.Application.Dtos.Project;
using BugTracker.Domain.Entities;

namespace BugTracker.Application.IServices
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetAllProjects(string userId);
        Task<ProjectDto> GetProject(int projectId);
        Task<Project> CreateProject(ProjectDto projectDto, string userId);
        Task<UpdateProjectDto> UpdateProject(int projectId, UpdateProjectDto projectDto);
        Task DeleteProject(int projectId);
    }
}
