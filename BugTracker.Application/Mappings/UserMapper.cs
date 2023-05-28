using AutoMapper;
using BugTracker.Application.Dtos.User;
using BugTracker.Domain.Entities.Identity;

namespace BugTracker.Application.Mappings
{
    public class UserMapper:Profile
    {
        public UserMapper()
        {
            CreateMap<UserDto, ApplicationUser>();
            CreateMap<ApplicationUser, UserDto>();

            CreateMap<UpdateUserDto, ApplicationUser>();
            CreateMap<ApplicationUser, UpdateUserDto>();
        }
    }
}
