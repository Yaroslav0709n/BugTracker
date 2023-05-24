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
        public async Task<ActionResult> AddProject([FromBody] ProjectDto projectDto, string userId)
        {
            await _projectService.CreateProject(projectDto, userId);
            return Ok(projectDto);
        }
        
        [HttpGet("user/{userId}")]
        public async Task<ActionResult> GetAllProjectsByUserId(string userId)
        {
            var allProjects = await _projectService.GetAllProjects(userId);
            return Ok(allProjects);
        }

        [HttpGet("project/{projectId}")]
        public async Task<ActionResult> GetProjectById(int projectId)
        {
            var project = await _projectService.GetProject(projectId);
            return Ok(project);
        }

       [HttpPut, Authorize(Roles = "Project Manager")]
        public async Task<ActionResult> UpdateProjectById(int projectId, [FromBody] UpdateProjectDto projectDto)
        {
            var updatedProject = await _projectService.UpdateProject(projectId, projectDto);
            return Ok(updatedProject);
        }

        [HttpDelete, Authorize(Roles = "Project Manager")] 
        public async Task<ActionResult> DeleteProjectById(int projectId)
        {
            await _projectService.DeleteProject(projectId);
            return Ok("Delete complete");
        }
        
    }
}
