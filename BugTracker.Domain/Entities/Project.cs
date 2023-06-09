﻿namespace BugTracker.Domain.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime UpdateTime { get; set; }

        public ICollection<ProjectUser> ProjectUser { get; set; }
        public ICollection<Ticket> Ticket { get; set; }

    }
}
