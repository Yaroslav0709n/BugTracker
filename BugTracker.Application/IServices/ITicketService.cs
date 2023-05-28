using BugTracker.Application.Dtos.Ticket;
using BugTracker.Domain.Entities;

namespace BugTracker.Application.IServices
{
    public interface ITicketService
    {
        Task<IEnumerable<TicketDto>> GetAllTickets(int projectId);
        Task<InfoAboutTicketDto> GetTicket(int ticketId);
        Task<Ticket> CreateTicket(AddTicketDto ticketDto, string userId, int projectId);
        Task<UpdateTicketDto> UpdateTicket(UpdateTicketDto ticketDto, int projecttId);
        Task DeleteTicket(int ticketId);
    }
}
