﻿using BugTracker.Domain.Entities.Identity;
using BugTracker.Domain.IRepositories;
using BugTracker.Infrastructure.Context;

namespace BugTracker.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IdentityBugTrackerContext _context;
        public UserRepository(IdentityBugTrackerContext context)
        {
            _context = context;
        }
        public async Task<ApplicationUser> GetUserAsync(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            return user!;
        }

        public async Task<ApplicationUser> UpdateUserDataAsync(ApplicationUser user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
