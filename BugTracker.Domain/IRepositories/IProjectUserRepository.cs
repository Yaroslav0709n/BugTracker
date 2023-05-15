using BugTracker.Domain.Entities;
using BugTracker.Domain.Entities.Identity;

namespace BugTracker.Domain.IRepositories
{
    public interface IProjectUserRepository
    {
        Task<IEnumerable<ApplicationUser>> GetAllProjectsUserAsync(int projectId);
        Task<IEnumerable<ApplicationUser>> GetNonProjectsUserAsync(int projectId);
        Task<ProjectUser> CreateUserProjectAsync(ProjectUser userProject);
        Task RemoveFromProjectAsync(string userId, int projectId);
    }
}
