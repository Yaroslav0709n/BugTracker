using BugTracker.Application.Dtos.Commentary;

namespace BugTracker.Application.IServices
{
    public interface ICommentaryService
    {
        Task<IEnumerable<CommentaryDto>> GetAllCommentaries(int ticketId);
        Task<AddCommentaryDto> CreateCommentary(string text, int tickettId);
        Task<string> UpdateCommentary(string text, int commentId);
        Task DeleteCommentary(int ticketId);
    }
}
