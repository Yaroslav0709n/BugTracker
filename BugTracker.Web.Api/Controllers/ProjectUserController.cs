﻿using BugTracker.Application.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectUserController : ControllerBase
    {
        private readonly IProjectUserService _userProjectService;

        public ProjectUserController(IProjectUserService userProjectService)
        {
            _userProjectService = userProjectService;
        }

        [HttpPost, Authorize(Roles = "Project Manager")]
        public async Task<ActionResult> CreateUserProject(string userId, int projectId)
        {
            await _userProjectService.AddUserProject(userId, projectId);
            return Ok("Create complete");
        }

        [HttpGet]
        public async Task<ActionResult> GetAllProjectsUserById(int projectId)
        {
            var usersProject = await _userProjectService.GetAllProjectUsers(projectId);
            return Ok(usersProject);
        }

        [HttpDelete, Authorize(Roles = "Project Manager")]
        public async Task<ActionResult> RemoveUserFromProject(string userId, int projectId)
        {
            await _userProjectService.RemoveFromProject(userId, projectId);
            return Ok("User removed from project");
        }

        [HttpGet("{projectId}"), Authorize(Roles = "Project Manager")]
        public async Task<ActionResult> GetNonProjectUsersById(int projectId)
        {
            var nonUserProject = await _userProjectService.GetNonProjectUsers(projectId);
            return Ok(nonUserProject);
        }
    }
}
