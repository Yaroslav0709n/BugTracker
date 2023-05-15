using BugTracker.Application.Dtos.Project;

namespace BugTracker.Application.IServices
{
    public interface IProjectUserService
    {
        Task AddUserProject(string userId, int projectId);
        Task<IEnumerable<UsersProjectsDto>> GetAllProjectsUser(int projectId);
        Task<IEnumerable<UsersProjectsDto>> GetNonProjectUsers(int projectId);
        Task RemoveFromProject(string userId, int projectId);
    }
}
