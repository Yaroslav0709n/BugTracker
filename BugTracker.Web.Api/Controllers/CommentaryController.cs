using BugTracker.Application.Dtos.Commentary;
using BugTracker.Application.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentaryController : ControllerBase
    {
        private readonly ICommentaryService _commentaryService;
        public CommentaryController(ICommentaryService commentaryService)
        {
            _commentaryService = commentaryService;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult> GetAllCommentariesByTicketId(int ticketId)
        {
            var commentaries = await _commentaryService.GetAllCommentaries(ticketId);
            return Ok(commentaries);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult> AddCommentary([FromBody] AddCommentaryDto commentaryDto, int ticketId)
        {
            var commentary = await _commentaryService.CreateCommentary(commentaryDto, ticketId);
            return Ok(commentary);
        }

        [HttpPut, Authorize]
        public async Task<ActionResult> UpdateCommentaryById([FromBody] string text, int commentId)
        {
            var commentary = await _commentaryService.UpdateCommentary(text, commentId);
            return Ok(commentary);
        }

        [HttpDelete, Authorize]
        public async Task<ActionResult> DeleteCommentaryById(int commentId)
        {
            await _commentaryService.DeleteCommentary(commentId);
            return Ok(true);
        }
    }
}
