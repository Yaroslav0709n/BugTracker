using BugTracker.Domain.Entities;

namespace BugTracker.Domain.IRepositories
{
    public interface ITicketRepository
    {
        Task<IEnumerable<Ticket>> GetAllTicketsAsync(int projectId);
        Task<IEnumerable<Ticket>> GetAllUsersTicketsAsync(string userId);
        Task<Ticket> GetTicketAsync(int ticketId);
        Task<Ticket> AddTicketAsync(Ticket ticket, string userId);
        Task<Ticket> UpdateTicketAsync(Ticket ticket);
        Task DeleteTicketAsync(int ticketId);
    }
}
