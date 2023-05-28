using BugTracker.Application.Dtos.Ticket;

namespace BugTracker.Application.IServices
{
    public interface ITicketUserService
    {
        Task<IEnumerable<UsersTicketsDto>> GetAllTicketUsers(int ticketId);
        Task<IEnumerable<UsersTicketsDto>> GetNonTicketUsers(int projectId, int ticketId);
        Task AddUserTicket(string userId, int ticketId);
        Task RemoveFromTicket(string userId, int ticketId);
    }
}
