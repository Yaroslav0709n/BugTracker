using BugTracker.Application.Dtos.Commentary;
using BugTracker.Application.Dtos.Project;
using BugTracker.Application.Dtos.Ticket;
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
            services.AddTransient<IValidator<UpdateProjectDto>, UpdateProjectValidator>();
            services.AddTransient<IValidator<CreateTicketDto>, AddTicketValidator>();
            services.AddTransient<IValidator<UpdateTicketDto>, UpdateTicketValidator>();
            services.AddTransient<IValidator<AddCommentaryDto>, AddCommentaryValidator>();

            return services;
        }
    }
}
