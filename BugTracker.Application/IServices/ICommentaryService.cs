using BugTracker.Application.Dtos.Commentary;

namespace BugTracker.Application.IServices
{
    public interface ICommentaryService
    {
        Task<IEnumerable<CommentaryDto>> GetAllCommentaries(int ticketId);
        Task<bool> CreateCommentary(AddCommentaryDto commentaryDto, int ticketId);
        Task<string> UpdateCommentary(string text, int commentId);
        Task DeleteCommentary(int ticketId);
    }
}
