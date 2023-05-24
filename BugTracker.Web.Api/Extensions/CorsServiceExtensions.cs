using FluentValidation.AspNetCore;
using System.Reflection;

namespace BugTracker.Web.Api.Extensions
{
    public static class CorsServiceExtensions
    {
        public static IServiceCollection AddCorsService(this IServiceCollection services)
        {
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

    
            return services;
        }
    }
}
