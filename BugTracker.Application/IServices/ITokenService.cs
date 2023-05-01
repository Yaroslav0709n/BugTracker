using BugTracker.Domain.Entities.Identity;

namespace BugTracker.Application.IServices
{
    public interface ITokenService
    {
        string CreateToken(ApplicationUser user);
    }
}
