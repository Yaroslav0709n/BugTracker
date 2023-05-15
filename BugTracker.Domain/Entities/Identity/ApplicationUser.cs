using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace BugTracker.Domain.Entities.Identity
{
    [Table("AspNetUsers")]
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public ICollection<ProjectUser> ProjectUser { get; set; }
    }
}
