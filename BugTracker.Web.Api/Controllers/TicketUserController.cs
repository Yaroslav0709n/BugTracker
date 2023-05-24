using BugTracker.Application.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketUserController : ControllerBase
    {
        private readonly ITicketUserService _ticketUserService;
        public TicketUserController(ITicketUserService ticketUserService)
        {
            _ticketUserService = ticketUserService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllTicketsUserById(int ticketId)
        {
            var usersTicket = await _ticketUserService.GetAllTicketUsers(ticketId);
            return Ok(usersTicket);
        }
        
        [HttpPost]
        public async Task<ActionResult> CreateUserTicket(string userId, int ticketId)
        {
            await _ticketUserService.AddUserTicket(userId, ticketId);
            return Ok(true);
        }
        
        [HttpGet("{ticketId}")]
        public async Task<ActionResult> GetNonTicketUsersById(int ticketId)
        {
            var nonTicketUsers = await _ticketUserService.GetNonTicketUsers(ticketId);
            return Ok(nonTicketUsers);
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveUserFromTicket(string userId, int ticketId)
        {
            await _ticketUserService.RemoveFromTicket(userId, ticketId);
            return Ok(true);
        }



    }
}
