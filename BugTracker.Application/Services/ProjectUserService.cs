using AutoMapper;
using BugTracker.Application.Dtos.Project;
using BugTracker.Application.Extensions;
using BugTracker.Application.IServices;
using BugTracker.Application.ValidationExtensions;
using BugTracker.Domain.Entities;
using BugTracker.Domain.IRepositories;
using Microsoft.AspNetCore.Http;

namespace BugTracker.Application.Services
{
    public class ProjectUserService : IProjectUserService
    {
        private readonly IProjectUserRepository _projectUserRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;

        public ProjectUserService(IProjectUserRepository projectUserRepository, 
                                  IMapper mapper, 
                                  IHttpContextAccessor contextAccessor)
        {
            _projectUserRepository = projectUserRepository;
            _mapper = mapper;
            _contextAccessor = contextAccessor;
        }

        public async Task AddUserProject(string userId, int projectId)
        {
            var addProjectUser = new ProjectUser
            {
                ApplicationUserId = userId,
                ProjectId = projectId,
            };
            await _projectUserRepository.CreateUserProjectAsync(addProjectUser);
        }

        public Task RemoveFromProject(string userId, int projectId)
        {
            return _projectUserRepository.RemoveFromProjectAsync(userId, projectId);
        }

        /*
            GetProjectUsers - users who are in the project, except for creator
        */
        public async Task<IEnumerable<UsersProjectsDto>> GetProjectUsers(int projectId)
        {
            var userId = _contextAccessor.HttpContext!.User.GetCurrentUserId().ToString();
            var users = await _projectUserRepository.GetProjectUsersAsync(projectId, userId);

            users.ThrowIfNull(nameof(users));

            return _mapper.Map<IEnumerable<UsersProjectsDto>>(users);
        }

        /*
            GetAllProjectUsers - users who are in the project
        */
        public async Task<IEnumerable<UsersProjectsDto>> GetAllProjectUsers(int projectId)
        {
            var users = await _projectUserRepository.GetAllProjectUsersAsync(projectId);

            users.ThrowIfNull(nameof(users));

            return _mapper.Map<IEnumerable<UsersProjectsDto>>(users);
        }

        /*
            GetNonProjectUsers - users who are not in the project
        */
        public async Task<IEnumerable<UsersProjectsDto>> GetNonProjectUsers(int projectId)
        {
            var users = await _projectUserRepository.GetNonProjectUsersAsync(projectId);

            users.ThrowIfNull(nameof(users));

            return _mapper.Map<IEnumerable<UsersProjectsDto>>(users);
        }
    }
}
