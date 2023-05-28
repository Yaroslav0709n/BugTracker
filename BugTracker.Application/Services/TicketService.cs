using AutoMapper;
using BugTracker.Application.Dtos.Ticket;
using BugTracker.Application.IServices;
using BugTracker.Application.ValidationExtensions;
using BugTracker.Domain.Entities;
using BugTracker.Domain.IRepositories;

namespace BugTracker.Application.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public TicketService(ITicketRepository ticketRepository, IUserRepository userRepository, IMapper mapper)
        {
            _ticketRepository = ticketRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public async Task<Ticket> CreateTicket(AddTicketDto ticketDto, string userId, int projectId)
        {
            ticketDto.ThrowIfNull(nameof(ticketDto));

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
            var tickets = await _ticketRepository.GetAllTicketsAsync( projectId);

            tickets.ThrowIfNull(nameof(tickets));

            var ticketsDto = _mapper.Map<IEnumerable<TicketDto>>(tickets);
            foreach (var t in ticketsDto)
            {
                var fullNameUser = await _userRepository.GetUserAsync(t.CreatedByUserId);
                t.CreatedUserName = $"{fullNameUser.FirstName} {fullNameUser.LastName}";  
            }
            return ticketsDto;
        }

        public async Task<InfoAboutTicketDto> GetTicket(int ticketId)
        {
            var ticket = await _ticketRepository.GetTicketAsync(ticketId);

            ticket.ThrowIfNull(nameof(ticket));

            var ticketFullInfo = _mapper.Map<InfoAboutTicketDto>(ticket);

            var fullName = await _userRepository.GetUserAsync(ticket.CreatedByUserId);

            fullName.ThrowIfNull(nameof(fullName));

            ticketFullInfo.CreatedUserName = $"{fullName.FirstName} {fullName.LastName}";
            return ticketFullInfo;
        }

        public async Task<UpdateTicketDto> UpdateTicket(UpdateTicketDto ticketDto, int ticketId)
        {
            ticketDto.ThrowIfNull(nameof(ticketDto));

            var existTicket = await _ticketRepository.GetTicketAsync(ticketId);

            existTicket.ThrowIfNull(nameof(existTicket));

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
