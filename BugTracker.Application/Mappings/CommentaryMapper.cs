using AutoMapper;
using BugTracker.Application.Dtos.Commentary;
using BugTracker.Domain.Entities;

namespace BugTracker.Application.Mappings
{
    internal class CommentaryMapper:Profile
    {
        public CommentaryMapper()
        {
            CreateMap<AddCommentaryDto, Commentary>();
            CreateMap<Commentary, AddCommentaryDto>();

            CreateMap<CommentaryDto, Commentary>();
            CreateMap<Commentary, CommentaryDto>();
        }
    }
}
