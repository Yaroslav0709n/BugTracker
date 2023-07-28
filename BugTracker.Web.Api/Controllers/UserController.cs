using BugTracker.Application.Dtos.User;
using BugTracker.Application.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult> GetUserById(string userId) 
        {
            var user = await _userService.GetUser(userId);
            return Ok(user);
        }
        [HttpGet("/users"), Authorize]
        public async Task<ActionResult> GetUsers()
        {
            var user = await _userService.GetUsers();
            return Ok(user);
        }
        [HttpPut, Authorize]
        public async Task<ActionResult> UpdateUserById([FromBody] UpdateUserDto updateUserDto)
        {
            var userModel = await _userService.UpdateUser(updateUserDto);
            return Ok(userModel);
        }
    }
}
