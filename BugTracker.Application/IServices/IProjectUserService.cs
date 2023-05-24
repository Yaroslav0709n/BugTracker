using BugTracker.Application.Dtos.Project;

namespace BugTracker.Application.IServices
{
    public interface IProjectUserService
    {
        Task<IEnumerable<UsersProjectsDto>> GetAllProjectUsers(int projectId);
        Task<IEnumerable<UsersProjectsDto>> GetNonProjectUsers(int projectId);
        Task AddUserProject(string userId, int projectId);
        Task RemoveFromProject(string userId, int projectId);
    }
}
