using BugTracker.Domain.Entities;

namespace BugTracker.Domain.IRepositories
{
    public interface ICommentaryRepository
    {
        Task<IEnumerable<Commentary>> GetAllCommentariesAsync(int ticketId);
        Task<Commentary> GetCommentaryById(int commentId);
        Task<Commentary> AddCommentaryAsync(Commentary commentary, string userId, int ticketId);
        Task<Commentary> UpdateCommentaryAsync(Commentary commentary);
        Task DeleteCommentaryAsync(int ticketId);
    }
}
