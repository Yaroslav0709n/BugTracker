using BugTracker.Application.IServices;
using BugTracker.Application.Services;
using BugTracker.Domain.IRepositories;
using BugTracker.Infrastructure.Repositories;

namespace BugTracker.Web.Api.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            return services;
        }
    }
}
