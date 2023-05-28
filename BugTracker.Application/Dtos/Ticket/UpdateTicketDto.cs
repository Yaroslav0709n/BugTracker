using BugTracker.Domain.Enums;

namespace BugTracker.Application.Dtos.Ticket
{
    public class UpdateTicketDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime UpdateTime { get; set; }
        public Priorities Priority { get; set; }
        public Statuses Status { get; set; }
        public Types Type { get; set; }
    }
}
