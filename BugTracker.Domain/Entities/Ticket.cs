using BugTracker.Domain.Entities.Identity;
using BugTracker.Domain.Enums;

namespace BugTracker.Domain.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public Priorities Priority{ get; set; }
        public Statuses Status { get; set; }
        public Types Type { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public string CreatedByUserId { get; set; } 
        public ApplicationUser CreatedByUser { get; set; }

        public ICollection<TicketUser> TicketUser { get; set; }
        public ICollection<Commentary> Commentary { get; set; }

    }
}
