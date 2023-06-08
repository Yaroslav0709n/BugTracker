using AutoMapper;
using BugTracker.Application.Dtos.Project;
using BugTracker.Application.IServices;
using Microsoft.AspNetCore.Authorization;
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

        [HttpPost, Authorize(Roles = "Project Manager")]
        public async Task<ActionResult> AddProject([FromBody] ProjectDto createProjectDto)
        {
            var projectModel = await _projectService.CreateProject(createProjectDto);
            return Ok(projectModel);
        }

        [HttpGet, Authorize]
        public async Task<ActionResult> GetAllProjectsByUserId()
        {
            var projects = await _projectService.GetAllProjects();
            return Ok(projects);
        }

        [HttpGet("project/{projectId}")]
        public async Task<ActionResult> GetProjectById(int projectId)
        {
            var projectById = await _projectService.GetProject(projectId);
            return Ok(projectById);
        }

        [HttpPut, Authorize(Roles = "Project Manager")]
        public async Task<ActionResult> UpdateProjectById(int projectId, [FromBody] UpdateProjectDto updateProjectDto)
        {
            var projectModel = await _projectService.UpdateProject(projectId, updateProjectDto);
            return Ok(projectModel);
        }

        [HttpDelete, Authorize(Roles = "Project Manager")] 
        public async Task<ActionResult> DeleteProjectById(int projectId)
        {
            await _projectService.DeleteProject(projectId);
            return Ok(true);
        }
        
    }
}
