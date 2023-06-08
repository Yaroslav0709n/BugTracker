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
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;

        public ProjectService(IProjectRepository projectRepository, 
                              IMapper mapper, 
                              IHttpContextAccessor contextAccessor)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _contextAccessor = contextAccessor;
        }

        public async Task<ProjectDto> CreateProject(ProjectDto projectDto)
        {
            var userId = _contextAccessor.HttpContext!.User.GetCurrentUserId().ToString();

            projectDto.ThrowIfNull(nameof(projectDto));

            var newProject = _mapper.Map<Project>(projectDto);

            newProject.CreateTime = DateTime.Now;
            newProject.UpdateTime = DateTime.Now;

            var createdProject = await _projectRepository.AddProject(newProject, userId);
            return _mapper.Map<ProjectDto>(createdProject);
        }

        public Task DeleteProject(int projectId)
        {
            return _projectRepository.DeleteProjectAsync(projectId);
        }

        public async Task<IEnumerable<ProjectDto>> GetAllProjects()
        {
            var userId = _contextAccessor.HttpContext!.User.GetCurrentUserId().ToString();

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

        public async Task<UpdateProjectDto> UpdateProject(int projectId, UpdateProjectDto updateProjectDto)
        {
            updateProjectDto.ThrowIfNull(nameof(updateProjectDto));

            var existProject = await _projectRepository.GetProjectAsync(projectId);

            existProject.ThrowIfNull(nameof(existProject));

            existProject.Name = updateProjectDto.Name;
            existProject.Description = updateProjectDto.Description;
            existProject.UpdateTime = DateTime.Now;

            var updatedProject = await _projectRepository.UpdateProjectAsync(existProject);

            return _mapper.Map<UpdateProjectDto>(updatedProject);
        }
    }
}
