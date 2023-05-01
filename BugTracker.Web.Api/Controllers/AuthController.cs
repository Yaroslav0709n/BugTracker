using BugTracker.Application.Dtos.User;
using BugTracker.Application.IServices;
using BugTracker.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        public AuthController(UserManager<ApplicationUser> userManager,
                              ITokenService tokenService,
                              ILogger<AuthController> logger)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var userEmailExist = await _userManager.FindByEmailAsync(registerDto.Email);
            if (userEmailExist != null)
                return BadRequest("Email is taken");

            ApplicationUser user = new ApplicationUser()
            {
                UserName = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
                return BadRequest(ModelState);
            }
            return Ok("All okay!!!!!");
        }


        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid email" });
            }

            if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return BadRequest(new { message = "Invalid password" });
            }

            return Ok(_tokenService.CreateToken(user));
        }
    }
}
