using Microsoft.AspNetCore.Identity;

namespace BugTracker.Domain.Entities.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<Project> Projects { get; set; }
    }
}
