using BugTracker.Application.Dtos.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Application.IServices
{
    public interface IUserService
    {
        Task<UserDto> GetUser(string userId);
        Task<UpdateUserDto> UpdateUser(UpdateUserDto updateUserDto, string userId);
    }
}
