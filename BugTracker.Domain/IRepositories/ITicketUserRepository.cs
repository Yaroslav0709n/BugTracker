using BugTracker.Domain.Entities;
using BugTracker.Domain.Entities.Identity;

namespace BugTracker.Domain.IRepositories
{
    public interface ITicketUserRepository
    {
        Task<IEnumerable<ApplicationUser>> GetAllTicketsUserAsync(int ticketId);
        Task<IEnumerable<ApplicationUser>> GetNonTicketsUserAsync(int projectId, int ticketId);
        Task<TicketUser> CreateUserTicketAsync(TicketUser userTicket);
        Task RemoveFromTicketAsync(string userId, int ticketId);
    }
}
