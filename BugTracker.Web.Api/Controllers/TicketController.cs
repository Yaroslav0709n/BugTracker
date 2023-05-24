using BugTracker.Application.Dtos.Ticket;
using BugTracker.Application.IServices;
using Microsoft.AspNetCore.Http;
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

        [HttpGet("project/{projectId}")]
        public async Task<ActionResult> GetAllTicketsByProjectId(int projectId)
        {
            var allTickets = await _ticketService.GetAllTickets(projectId);
            return Ok(allTickets);
        }

        [HttpGet("ticket/{ticketId}")]
        public async Task<ActionResult> GetTicketById(int ticketId)
        {
            var ticket = await _ticketService.GetTicket(ticketId);
            return Ok(ticket);
        }

        [HttpPost]
        public async Task<ActionResult> AddTicket([FromBody] AddTicketDto ticketDto, string userId, int projectId)
        {
            await _ticketService.CreateTicket(ticketDto, userId, projectId);
            return Ok(ticketDto);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateTicket([FromBody] UpdateTicketDto updateTicketDto, int ticketId)
        {
            await _ticketService.UpdateTicket(updateTicketDto, ticketId);
            return Ok(updateTicketDto);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteProjectById(int ticketId)
        {
            await _ticketService.DeleteTicket(ticketId);
            return Ok("Delete complete");
        }
    }
}
