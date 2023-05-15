using BugTracker.Domain.Entities.Identity;

namespace BugTracker.Domain.Entities
{
    public class ProjectUser
    {
        public int Id { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}
