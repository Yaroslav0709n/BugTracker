using BugTracker.Application.Dtos.User;

namespace BugTracker.Application.IServices
{
    public interface IUserService
    {
        Task<UserDto> GetUser(string userId);
        Task<UpdateUserDto> UpdateUser(UpdateUserDto updateUserDto, string userId);
    }
}
