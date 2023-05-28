using AutoMapper;
using BugTracker.Application.Dtos.Project;
using BugTracker.Application.IServices;
using BugTracker.Application.ValidationExtensions;
using BugTracker.Domain.Entities;
using BugTracker.Domain.IRepositories;

namespace BugTracker.Application.Services
{
    public class ProjectUserService : IProjectUserService
    {
        private readonly IProjectUserRepository _projectUserRepository;
        private readonly IMapper _mapper;

        public ProjectUserService(IProjectUserRepository projectUserRepository, IMapper mapper)
        {
            _projectUserRepository = projectUserRepository;
            _mapper = mapper;
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
            GetAllProjectUsers - users who are in the project
        */
        public async Task<IEnumerable<UsersProjectsDto>> GetAllProjectUsers(int projectId)
        {
            var users = await _projectUserRepository.GetAllProjectsUserAsync(projectId);

            users.ThrowIfNull(nameof(users));

            return _mapper.Map<IEnumerable<UsersProjectsDto>>(users);
        }

        /*
            GetNonProjectUsers - users who are not in the project
        */
        public async Task<IEnumerable<UsersProjectsDto>> GetNonProjectUsers(int projectId)
        {
            var nonUsers = await _projectUserRepository.GetNonProjectsUserAsync(projectId);

            nonUsers.ThrowIfNull(nameof(nonUsers));

            return _mapper.Map<IEnumerable<UsersProjectsDto>>(nonUsers);
        }
    }
}
