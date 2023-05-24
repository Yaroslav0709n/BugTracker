using AutoMapper;
using BugTracker.Application.Dtos.Project;
using BugTracker.Application.Dtos.Ticket;
using BugTracker.Application.IServices;
using BugTracker.Domain.Entities;
using BugTracker.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Application.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IMapper _mapper;
        public TicketService(ITicketRepository ticketRepository, IMapper mapper)
        {
            _ticketRepository = ticketRepository;
            _mapper = mapper;
        }
        public async Task<Ticket> CreateTicket(AddTicketDto ticketDto, string userId, int projectId)
        {
            var ticket = _mapper.Map<Ticket>(ticketDto);

            ticket.CreateTime = DateTime.Now;
            ticket.UpdateTime = DateTime.Now;

            return await _ticketRepository.AddTicketAsync(ticket, userId, projectId);
        }

        public Task DeleteTicket(int ticketId)
        {
            return _ticketRepository.DeleteTicketAsync(ticketId);
        }

        public async Task<IEnumerable<TicketDto>> GetAllTickets(int projectId)
        {
            var tickets = await _ticketRepository.GetAllTicketsAsync(projectId);
            var ticketsDto = _mapper.Map<IEnumerable<TicketDto>>(tickets);
            return ticketsDto;
        }

        public async Task<InfoAboutTicketDto> GetTicket(int ticketId)
        {
            var ticket = await _ticketRepository.GetTicketAsync(ticketId);
            return _mapper.Map<InfoAboutTicketDto>(ticket);
        }

        public async Task<UpdateTicketDto> UpdateTicket(UpdateTicketDto ticketDto, int ticketId)
        {
            var existTicket = await _ticketRepository.GetTicketAsync(ticketId);

            existTicket.Title = ticketDto.Title;
            existTicket.Description = ticketDto.Description;
            existTicket.UpdateTime = DateTime.Now;
            existTicket.Priority = ticketDto.Priority;
            existTicket.Status = ticketDto.Status;
            existTicket.Type = ticketDto.Type;
           
            var updateTicket = await _ticketRepository.UpdateTicketAsync(existTicket);

            return _mapper.Map<UpdateTicketDto>(updateTicket);
        }
    }
}
