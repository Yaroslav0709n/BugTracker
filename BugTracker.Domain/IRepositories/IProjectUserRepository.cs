using BugTracker.Domain.Entities;
using BugTracker.Domain.Entities.Identity;

namespace BugTracker.Domain.IRepositories
{
    public interface IProjectUserRepository
    {
        Task<IEnumerable<ApplicationUser>> GetProjectUsersAsync(int projectId, string userId);
        Task<IEnumerable<ApplicationUser>> GetAllProjectUsersAsync(int projectId);
        Task<IEnumerable<ApplicationUser>> GetNonProjectUsersAsync(int projectId);
        Task<ProjectUser> CreateUserProjectAsync(ProjectUser userProject);
        Task RemoveFromProjectAsync(string userId, int projectId);
    }
}
