using BugTracker.Domain.Entities;
using BugTracker.Domain.Entities.Identity;
using BugTracker.Domain.IRepositories;
using BugTracker.Infrastructure.Context;
using BugTracker.Infrastructure.Context.ApplicationDbContext;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BugTracker.Infrastructure.Repositories
{
    public class TicketUserRepository : ITicketUserRepository
    {
        private readonly ApplicationContext _context;
        public TicketUserRepository(ApplicationContext context)
        {
            _context = context;
        }
        public async Task<TicketUser> CreateUserTicketAsync(TicketUser userTicket)
        {
            await _context.TicketUser.AddAsync(userTicket);
            await _context.SaveChangesAsync();
            return userTicket;
        }

        public async Task<IEnumerable<ApplicationUser>> GetAllTicketsUserAsync(int ticketId)
        {
            return await _context.TicketUser
                        .Where(x => x.TicketId == ticketId)
                        .Select(x => x.ApplicationUser)
                        .ToListAsync();
        }

        public async Task<IEnumerable<ApplicationUser>> GetNonTicketsUserAsync(int projectId, int ticketId)
        {
            var ticketUsersByIds = await _context.TicketUser
                                   .Where(x => x.TicketId == ticketId)
                                   .Select(x =>x.ApplicationUserId)
                                   .ToListAsync();
            
            var projectUsersByIds = await _context.ProjectUser
                                    .Where(x => x.ProjectId == projectId)
                                    .Select(x => x.ApplicationUser)
                                    .Where(x => !ticketUsersByIds.Contains(x.Id))
                                    .ToListAsync();

            return projectUsersByIds;
        }

        public async Task RemoveFromTicketAsync(string userId, int ticketId)
        {
            var user = await _context.TicketUser.FirstOrDefaultAsync(x => x.ApplicationUserId == userId);
            _context.TicketUser.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}
