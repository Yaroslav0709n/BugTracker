namespace BugTracker.Application.Dtos.Ticket
{
    public class TicketDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string CreatedByUserId { get; set; }
        public string CreatedUserName { get; set; }
    }
}
