using BugTracker.Application.Dtos.Project;
using BugTracker.Domain.Entities;

namespace BugTracker.Application.IServices
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetAllProjects();
        Task<ProjectDto> GetProject(int projectId);
        Task<ProjectDto> CreateProject(ProjectDto projectDto);
        Task<UpdateProjectDto> UpdateProject(int projectId, UpdateProjectDto projectDto);
        Task DeleteProject(int projectId);
    }
}
