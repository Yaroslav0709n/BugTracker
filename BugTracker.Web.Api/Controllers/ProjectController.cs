using BugTracker.Application.Dtos;
using BugTracker.Application.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpPost]
        public async Task<ProjectDto> AddProject(string userId, ProjectDto projectDto)
        {
            await _projectService.CreateProject(userId, projectDto);
            return projectDto;
        }
    }
}
