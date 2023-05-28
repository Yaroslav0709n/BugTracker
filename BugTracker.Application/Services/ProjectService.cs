using AutoMapper;
using BugTracker.Application.Dtos.Project;
using BugTracker.Application.IServices;
using BugTracker.Application.ValidationExtensions;
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

        public async Task<Project> CreateProject(ProjectDto projectDto, string userId)
        {
            projectDto.ThrowIfNull(nameof(projectDto));

            var project = _mapper.Map<Project>(projectDto);

            project.CreateTime = DateTime.Now;
            project.UpdateTime = DateTime.Now;

            return await _projectRepository.AddProject(project, userId);
        }

        public Task DeleteProject(int projectId)
        {
            return _projectRepository.DeleteProjectAsync(projectId);
        }

        public async Task<IEnumerable<ProjectDto>> GetAllProjects(string userId)
        {
            var projects = await _projectRepository.GetAllProjectsAsync(userId);

            projects.ThrowIfNull(nameof(projects));

            return _mapper.Map<IEnumerable<ProjectDto>>(projects);
        }

        public async Task<ProjectDto> GetProject(int projectId)
        {
            var project = await _projectRepository.GetProjectAsync(projectId);

            project.ThrowIfNull(nameof(project));

            return _mapper.Map<ProjectDto>(project);
        }

        public async Task<UpdateProjectDto> UpdateProject(int projectId, UpdateProjectDto projectDto)
        {
            projectDto.ThrowIfNull(nameof(projectDto));

            var existProject = await _projectRepository.GetProjectAsync(projectId);

            existProject.ThrowIfNull(nameof(existProject));

            existProject.Name = projectDto.Name;
            existProject.Description = projectDto.Description;
            existProject.UpdateTime = DateTime.Now;
            var updatedProject = await _projectRepository.UpdateProjectAsync(existProject);

            return _mapper.Map<UpdateProjectDto>(updatedProject);
        }
    }
}
