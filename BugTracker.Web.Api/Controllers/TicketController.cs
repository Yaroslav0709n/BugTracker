using BugTracker.Application.Dtos.Ticket;
using BugTracker.Application.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;
        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpGet("project/{projectId}"), Authorize]
        public async Task<ActionResult> GetAllTicketsByProjectId(int projectId)
        {
            var tickets = await _ticketService.GetAllTickets(projectId);
            return Ok(tickets);
        }

        [HttpGet("ticket/{ticketId}"), Authorize]
        public async Task<ActionResult> GetTicketById(int ticketId)
        {
            var ticket = await _ticketService.GetTicket(ticketId);
            return Ok(ticket);
        }

        [HttpGet, Authorize]
        public async Task<ActionResult> GetAllTicketsByUserId()
        {
            var tickets = await _ticketService.GetAllUsersTickets();
            return Ok(tickets);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult> AddTicket([FromBody] CreateTicketDto createTicketDto, int projectId)
        {
            var ticketModel = await _ticketService.CreateTicket(createTicketDto, projectId);
            return Ok(createTicketDto);
        }

        [HttpPut, Authorize]
        public async Task<ActionResult> UpdateTicketById([FromBody] UpdateTicketDto updateTicketDto, int ticketId)
        {
            var ticketModel = await _ticketService.UpdateTicket(updateTicketDto, ticketId);
            return Ok(ticketModel);
        }

        [HttpDelete, Authorize]
        public async Task<ActionResult> DeleteProjectById(int ticketId)
        {
            await _ticketService.DeleteTicket(ticketId);
            return Ok(true);
        }
    }
}
