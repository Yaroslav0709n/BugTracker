using BugTracker.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Application.Dtos.Ticket
{
    public class AddTicketDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public Priorities Priority { get; set; }
        public Statuses Status { get; set; }
        public Types Type { get; set; }
    }
}
