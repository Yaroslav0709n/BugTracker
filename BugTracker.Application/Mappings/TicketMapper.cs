using AutoMapper;
using BugTracker.Application.Dtos.Ticket;
using BugTracker.Domain.Entities;
using BugTracker.Domain.Entities.Identity;

namespace BugTracker.Application.Mappings
{
    public class TicketMapper:Profile
    {
        public TicketMapper()
        {
            CreateMap<AddTicketDto, Ticket>();
            CreateMap<Ticket, AddTicketDto>();

            CreateMap<TicketDto, Ticket>();
            CreateMap<Ticket, TicketDto>();

            CreateMap<InfoAboutTicketDto, Ticket>();
            CreateMap<Ticket, InfoAboutTicketDto>();

            CreateMap<UpdateTicketDto, Ticket>();
            CreateMap<Ticket, UpdateTicketDto>();

            CreateMap<ApplicationUser, UsersTicketsDto>();
            CreateMap<UsersTicketsDto, ApplicationUser>();
        }
    }
}
