using BugTracker.Application.Dtos.Ticket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Application.IServices
{
    public interface ITicketUserService
    {
        Task<IEnumerable<UsersTicketsDto>> GetAllTicketUsers(int ticketId);
        Task<IEnumerable<UsersTicketsDto>> GetNonTicketUsers(int ticketId);
        Task AddUserTicket(string userId, int ticketId);
        Task RemoveFromTicket(string userId, int ticketId);
    }
}
