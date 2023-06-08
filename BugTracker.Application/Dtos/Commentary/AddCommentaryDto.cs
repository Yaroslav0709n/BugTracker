namespace BugTracker.Application.Dtos.Commentary
{
    public class AddCommentaryDto
    {
        public string Text { get; set; }
        public DateTime CreateTime { get; set; }
        public string CreatedUserName { get; set; }
    }
}
