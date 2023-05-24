using BugTracker.Application.Dtos.User;
using BugTracker.Application.IServices;
using BugTracker.Application.Services;
using BugTracker.Application.Validation;
using BugTracker.Domain.IRepositories;
using BugTracker.Infrastructure.Repositories;
using FluentValidation;

namespace BugTracker.Web.Api.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<IProjectUserService, ProjectUserService>();
            services.AddScoped<IProjectUserRepository, ProjectUserRepository>();
            services.AddScoped<ITicketService, TicketService>();
            services.AddScoped<ITicketRepository, TicketRepository>();
            services.AddScoped<ITicketUserService, TicketUserService>();
            services.AddScoped<ITicketUserRepository, TicketUserRepository>();

            return services;
        }
    }
}
