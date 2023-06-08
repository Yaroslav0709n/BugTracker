using BugTracker.Application.Dtos.Commentary;
using BugTracker.Application.IServices;
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

        [HttpGet]
        public async Task<ActionResult> GetAllCommentariesByTicketId(int ticketId)
        {
            var commentaries = await _commentaryService.GetAllCommentaries(ticketId);
            return Ok(commentaries);
        }

        [HttpPost]
        public async Task<ActionResult> AddCommentary([FromBody] string text, int ticketId)
        {
            var commentary = await _commentaryService.CreateCommentary(text, ticketId);
            return Ok(commentary);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateCommentaryById([FromBody] string text, int commentId)
        {
            var commentary = await _commentaryService.UpdateCommentary(text, commentId);
            return Ok(commentary);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCommentaryById(int commentId)
        {
            await _commentaryService.DeleteCommentary(commentId);
            return Ok(true);
        }
    }
}
