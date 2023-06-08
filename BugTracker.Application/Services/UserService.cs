using AutoMapper;
using BugTracker.Application.Dtos.User;
using BugTracker.Application.Extensions;
using BugTracker.Application.IServices;
using BugTracker.Application.ValidationExtensions;
using BugTracker.Domain.IRepositories;
using Microsoft.AspNetCore.Http;

namespace BugTracker.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;

        public UserService(IUserRepository userRepository, 
                           IMapper mapper,
                           IHttpContextAccessor contextAccessor)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _contextAccessor = contextAccessor;

        }
        public async Task<UserDto> GetUser(string userId)
        {
            var user = await _userRepository.GetUserAsync(userId);

            user.ThrowIfNull(nameof(user));

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UpdateUserDto> UpdateUser(UpdateUserDto updateUserDto)
        {
            var userId = _contextAccessor.HttpContext!.User.GetCurrentUserId().ToString();

            updateUserDto.ThrowIfNull(nameof(updateUserDto));

            var existUser = await _userRepository.GetUserAsync(userId);

            existUser.ThrowIfNull(nameof(existUser));

            existUser.FirstName = updateUserDto.FirstName;
            existUser.LastName = updateUserDto.LastName;
            existUser.Email = updateUserDto.Email;
            existUser.NormalizedEmail = updateUserDto.Email.ToUpper();

            var updateUser = await _userRepository.UpdateUserDataAsync(existUser);

            return _mapper.Map<UpdateUserDto>(updateUser);
        }
    }
}
