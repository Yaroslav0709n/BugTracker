using BugTracker.Domain.Entities;
using BugTracker.Domain.IRepositories;
using BugTracker.Infrastructure.Context.ApplicationDbContext;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Infrastructure.Repositories
{
    public class CommentaryRepository : ICommentaryRepository
    {
        private readonly BugTrackerContext _context;
        public CommentaryRepository(BugTrackerContext context)
        {
            _context = context;
        }
        public async Task<Commentary> AddCommentaryAsync(Commentary commentary, string userId, int ticketId)
        {
            await _context.Commentary.AddAsync(commentary);
            await _context.SaveChangesAsync();
            return commentary;
        }

        public async Task DeleteCommentaryAsync(int commentId)
        {
            var commentary = await _context.Commentary.FindAsync(commentId);
            _context.Commentary.Remove(commentary);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Commentary>> GetAllCommentariesAsync(int ticketId)
        {
            return await _context.Commentary
                .Where(x => x.TicketId == ticketId)
                .ToListAsync();
        }

        public async Task<Commentary> GetCommentaryById(int commentId)
        {
            return await _context.Commentary.FindAsync(commentId);
        }

        public async Task<Commentary> UpdateCommentaryAsync(Commentary commentaryDto)
        {
            _context.Commentary.Update(commentaryDto);
            await _context.SaveChangesAsync();
            return commentaryDto;
        }
    }
}
