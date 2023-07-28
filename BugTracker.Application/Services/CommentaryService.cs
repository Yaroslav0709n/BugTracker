using AutoMapper;
using BugTracker.Application.Dtos.Commentary;
using BugTracker.Application.Extensions;
using BugTracker.Application.IServices;
using BugTracker.Application.ValidationExtensions;
using BugTracker.Domain.Entities;
using BugTracker.Domain.IRepositories;
using Microsoft.AspNetCore.Http;

namespace BugTracker.Application.Services
{
    public class CommentaryService : ICommentaryService
    {
        private readonly ICommentaryRepository _commentaryRepositories;
        private readonly IUserRepository _userRepository; 
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;

        public CommentaryService(ICommentaryRepository commentaryRepository,
                                 IUserRepository userRepository, 
                                 IMapper mapper,
                                 IHttpContextAccessor contextAccessor)
        {
            _commentaryRepositories = commentaryRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _contextAccessor = contextAccessor;
        }
        public async Task<bool> CreateCommentary(AddCommentaryDto commentDto, int ticketId)
        {
            var userId = _contextAccessor.HttpContext!.User.GetCurrentUserId().ToString();
        
            if (commentDto.Text.Length > 1000)
                throw new ArgumentException("'Text' must be no longer than 1000 characters.");
            else if (commentDto.Text.Length < 1)
                throw new ArgumentException("'Text' must be filled.");

            var commentary = new Commentary
            {
                Text = commentDto.Text,
                CreateTime = DateTime.Now,
                TicketId = ticketId,
                CreatedByUserId = userId
            };

            await _commentaryRepositories.AddCommentaryAsync(commentary, userId, ticketId);
            return true;
        }

        public async Task<IEnumerable<CommentaryDto>> GetAllCommentaries(int ticketId)
        {
            var commentaries = await _commentaryRepositories.GetAllCommentariesAsync(ticketId);

            commentaries.ThrowIfNull(nameof(commentaries));
            var commentDto = _mapper.Map<IEnumerable<CommentaryDto>>(commentaries);

            foreach(var c in commentDto)
            {
                var fullNameUser = await _userRepository.GetUserAsync(c.CreatedByUserId);
                c.CreatedByUserId = $"{fullNameUser.FirstName} {fullNameUser.LastName}";
            }
            return commentDto;
        }

        public Task DeleteCommentary(int commentId)
        {
            return _commentaryRepositories.DeleteCommentaryAsync(commentId);
        }

        public async Task<string> UpdateCommentary(string text, int commentId)
        {
            if (text.Length > 1000)
                throw new ArgumentException("'Text' must be no longer than 1000 characters.");
            else if (text.Length < 1)
                throw new ArgumentException("'Text'  must be filled.");

            var existComment = await _commentaryRepositories.GetCommentaryById(commentId);
            existComment.Text = text;

            var updateTicket = await _commentaryRepositories.UpdateCommentaryAsync(existComment);
            return updateTicket.Text;
        }
    }
}
