using BugTracker.Domain.Entities.Identity;

namespace BugTracker.Domain.IRepositories
{
    public interface IUserRepository
    {
        Task<ApplicationUser> GetUserAsync(string userId);
        Task<ApplicationUser> UpdateUserDataAsync(ApplicationUser user);
    }
}
