using AutoMapper;
using BugTracker.Application.Dtos.Ticket;
using BugTracker.Application.Extensions;
using BugTracker.Application.IServices;
using BugTracker.Application.ValidationExtensions;
using BugTracker.Domain.Entities;
using BugTracker.Domain.IRepositories;
using Microsoft.AspNetCore.Http;

namespace BugTracker.Application.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketUserService _ticketUserService;
        private readonly ITicketRepository _ticketRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;

        public TicketService(ITicketRepository ticketRepository,
                             ITicketUserService ticketUserService,
                             IUserRepository userRepository, 
                             IMapper mapper,
                             IHttpContextAccessor contextAccessor)
        {
            _ticketRepository = ticketRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _ticketUserService = ticketUserService;
            _contextAccessor = contextAccessor;
        }
        public async Task<Ticket> CreateTicket(CreateTicketDto ticketDto, int projectId)
        {
            var userId = _contextAccessor.HttpContext!.User.GetCurrentUserId().ToString();

            ticketDto.ThrowIfNull(nameof(ticketDto));

            var ticket = _mapper.Map<Ticket>(ticketDto);

            ticket.CreateTime = DateTime.Now;
            ticket.UpdateTime = DateTime.Now;
            ticket.CreatedByUserId = userId;
            ticket.ProjectId = projectId;

            return await _ticketRepository.AddTicketAsync(ticket, userId);
        }

        public Task DeleteTicket(int ticketId)
        {
            return _ticketRepository.DeleteTicketAsync(ticketId);
        }

        public async Task<IEnumerable<TicketDto>> GetAllTickets(int projectId)
        {
            var tickets = await _ticketRepository.GetAllTicketsAsync(projectId);

            tickets.ThrowIfNull(nameof(tickets));

            var ticketsDto = _mapper.Map<IEnumerable<TicketDto>>(tickets);
            foreach (var t in ticketsDto)
            {
                var fullNameUser = await _userRepository.GetUserAsync(t.CreatedByUserId);
                t.CreatedByUserId = $"{fullNameUser.FirstName} {fullNameUser.LastName}";  
            }
            return ticketsDto;
        }

        public async Task<IEnumerable<TicketDto>> GetAllUsersTickets()
        {
            var userId = _contextAccessor.HttpContext!.User.GetCurrentUserId().ToString();
            
            var tickets = await _ticketRepository.GetAllUsersTicketsAsync(userId);
            tickets.ThrowIfNull(nameof(tickets));

            return _mapper.Map<IEnumerable<TicketDto>>(tickets);
        }

        public async Task<InfoAboutTicketDto> GetTicket(int ticketId)
        {
            var ticket = await _ticketRepository.GetTicketAsync(ticketId);

            ticket.ThrowIfNull(nameof(ticket));

            var ticketFullInfo = _mapper.Map<InfoAboutTicketDto>(ticket);

            var userFullName = await _userRepository.GetUserAsync(ticket.CreatedByUserId);

            userFullName.ThrowIfNull(nameof(userFullName));

            ticketFullInfo.CreatedUserName = $"{userFullName.FirstName} {userFullName.LastName}";
            return ticketFullInfo;
        }

        public async Task<UpdateTicketDto> UpdateTicket(UpdateTicketDto updateTicketDto, int ticketId)
        {
            updateTicketDto.ThrowIfNull(nameof(updateTicketDto));

            var existTicket = await _ticketRepository.GetTicketAsync(ticketId);

            existTicket.ThrowIfNull(nameof(existTicket));

            existTicket.Title = updateTicketDto.Title;
            existTicket.Description = updateTicketDto.Description;
            existTicket.UpdateTime = DateTime.Now;
            existTicket.Priority = updateTicketDto.Priority;
            existTicket.Status = updateTicketDto.Status;
            existTicket.Type = updateTicketDto.Type;
           
            var updatedTicket = await _ticketRepository.UpdateTicketAsync(existTicket);

            return _mapper.Map<UpdateTicketDto>(updatedTicket);
        }
    }
}
