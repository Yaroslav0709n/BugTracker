using BugTracker.Application.Dtos.User;
using BugTracker.Domain.Entities.Identity;

namespace BugTracker.Application.IServices
{
    public interface IUserService
    {
        Task<UserDto> GetUser(string userId);
        Task<IEnumerable<UserDto>> GetUsers();
        Task<UpdateUserDto> UpdateUser(UpdateUserDto updateUserDto);
    }
}
