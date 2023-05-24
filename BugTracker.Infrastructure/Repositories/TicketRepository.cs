using BugTracker.Domain.Entities;
using BugTracker.Domain.IRepositories;
using BugTracker.Infrastructure.Context.ApplicationDbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Infrastructure.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly ApplicationContext _context;
        public TicketRepository(ApplicationContext context)
        {
            _context = context;
        }
        public async Task<Ticket> AddTicketAsync(Ticket ticket, string userId, int projectId)
        {
            ticket.CreatedByUserId = userId;
            ticket.ProjectId = projectId;

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
            var ticketUser = await _context.TicketUser.FirstOrDefaultAsync(x =>x.TicketId == ticketId); 
            _context.Ticket.Remove(ticket);
            _context.TicketUser.Remove(ticketUser);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Ticket>> GetAllTicketsAsync(int projectId)
        {
            return _context.Ticket.Where(x => x.ProjectId == projectId).ToList();
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
