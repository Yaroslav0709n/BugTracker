using BugTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Domain.IRepositories
{
    public interface ITicketRepository
    {
        Task<IEnumerable<Ticket>> GetAllTicketsAsync(int projectId);
        Task<Ticket> GetTicketAsync(int ticketId);
        Task<Ticket> AddTicketAsync(Ticket ticket, string userId, int projectId);
        Task<Ticket> UpdateTicketAsync(Ticket ticket);
        Task DeleteTicketAsync(int ticketId);
    }
}
