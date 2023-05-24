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
    public class TicketUserService : ITicketUserService
    {
        private readonly ITicketUserRepository _ticketUserRepository;
        private readonly IMapper _mapper;
        public TicketUserService(ITicketUserRepository ticketUserRepository, IMapper mapper)
        {
            _ticketUserRepository = ticketUserRepository;
            _mapper = mapper;
        }
        public async Task AddUserTicket(string userId, int ticketId)
        {
            var ticketUser = new TicketUser
            {
                ApplicationUserId = userId,
                TicketId = ticketId
            };
            await _ticketUserRepository.CreateUserTicketAsync(ticketUser);
        }

        /*
            GetAllTicketUsers - users who are execute the ticket
        */
        public async Task<IEnumerable<UsersTicketsDto>> GetAllTicketUsers(int ticketId)
        {
            var users = await _ticketUserRepository.GetAllTicketsUserAsync(ticketId);
            return _mapper.Map<IEnumerable<UsersTicketsDto>>(users);
        }

        /*
            GetNonTicketUsers - users who are not execute the ticket
        */
        public async Task<IEnumerable<UsersTicketsDto>> GetNonTicketUsers(int ticketId)
        {
            var nonUsers = await _ticketUserRepository.GetNonTicketsUserAsync(ticketId);
            return _mapper.Map<IEnumerable<UsersTicketsDto>>(nonUsers);
        }

        public async Task RemoveFromTicket(string userId, int ticketId)
        {
            await _ticketUserRepository.RemoveFromTicketAsync(userId, ticketId);
        }
    }
}
