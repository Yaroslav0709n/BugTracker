namespace BugTracker.Application.Dtos.Commentary
{
    public class CommentaryDto
    {
        public string Text { get; set; }
        public DateTime CreateTime { get; set; }
        public string CreatedByUserId { get; set; }
    }
}
