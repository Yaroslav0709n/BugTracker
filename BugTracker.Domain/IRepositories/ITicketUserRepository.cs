using BugTracker.Domain.Entities;
using BugTracker.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Domain.IRepositories
{
    public interface ITicketUserRepository
    {
        Task<IEnumerable<ApplicationUser>> GetAllTicketsUserAsync(int ticketId);
        Task<IEnumerable<ApplicationUser>> GetNonTicketsUserAsync(int ticketId);
        Task<TicketUser> CreateUserTicketAsync(TicketUser userTicket);
        Task RemoveFromTicketAsync(string userId, int ticketId);
    }
}
