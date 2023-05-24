using BugTracker.Application.Dtos.Project;
using BugTracker.Application.Dtos.User;
using BugTracker.Application.Validation;
using FluentValidation;

namespace BugTracker.Web.Api.Extensions
{
    public static class ValidationServicesExtensions
    {
        public static IServiceCollection AddValidationService(this IServiceCollection services)
        {
            services.AddTransient<IValidator<RegisterDto>, RegisterUserValidator>();
            services.AddTransient<IValidator<ProjectDto>, ProjectValidator>();

            return services;
        }
    }
}
