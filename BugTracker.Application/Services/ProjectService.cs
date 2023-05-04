using AutoMapper;
using BugTracker.Application.Dtos;
using BugTracker.Application.IServices;
using BugTracker.Domain.Entities;
using BugTracker.Domain.IRepositories;

namespace BugTracker.Application.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;
        public ProjectService(IProjectRepository projectRepository, IMapper mapper)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
        }

        public async Task<Project> CreateProject(string userId, ProjectDto projectDto)
        {
            var project = _mapper.Map<Project>(projectDto);

            project.ApplicationUserId = userId;

            return await _projectRepository.AddProject(project);
        }

        public Task DeleteProject(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            return await _projectRepository.GetAllProjects();
        }

        public Task<Project> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateProject(ProjectDto project)
        {
            throw new NotImplementedException();
        }
    }
}
