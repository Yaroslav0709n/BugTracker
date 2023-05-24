using BugTracker.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Application.Dtos.Ticket
{
    public class TicketDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string CreatorName { get; set; }
    }
}
