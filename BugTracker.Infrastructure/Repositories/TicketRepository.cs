using BugTracker.Domain.Entities;
using BugTracker.Domain.IRepositories;
using BugTracker.Infrastructure.Context.ApplicationDbContext;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Infrastructure.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly BugTrackerContext _context;
        public TicketRepository(BugTrackerContext context)
        {
            _context = context;
        }
        public async Task<Ticket> AddTicketAsync(Ticket ticket, string userId)
        {
            await _context.Ticket.AddAsync(ticket);
            await _context.SaveChangesAsync();

            var ticketUser = new TicketUser
            {
                TicketId = ticket.Id,
                ApplicationUserId = userId
            };

            await _context.TicketUser.AddAsync(ticketUser);
            await _context.SaveChangesAsync();

            return ticket;
        }

        public async Task DeleteTicketAsync(int ticketId)
        {
            var ticket = await _context.Ticket.FindAsync(ticketId);

            if(ticket != null)
                _context.Ticket.Remove(ticket);
            
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Ticket>> GetAllTicketsAsync(int projectId)
        {
            return await _context.Ticket
                .Where(x => x.ProjectId == projectId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Ticket>> GetAllUsersTicketsAsync(string userId)
        {
            return await _context.TicketUser
                .Include(x => x.Ticket)
                .Where(x => x.ApplicationUserId == userId)
                .Select(x => x.Ticket)
                .ToListAsync();
        }

        public async Task<Ticket> GetTicketAsync(int ticketId)
        {
            return await _context.Ticket.FindAsync(ticketId);
        }

        public async Task<Ticket> UpdateTicketAsync(Ticket ticket)
        {
            _context.Ticket.Update(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }
    }
}
