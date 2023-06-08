using BugTracker.Infrastructure.Context;
using BugTracker.Infrastructure.Context.ApplicationDbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BugTracker.Web.Api.Extensions
{
    public static class DbContextServiceExtensions
    {
        public static IServiceCollection AddDbContextService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<IdentityBugTrackerContext>(x => x.UseSqlServer(configuration.GetConnectionString("MSSQL")));
            services.AddDbContext<BugTrackerContext>(x => x.UseSqlServer(configuration.GetConnectionString("MSSQL")));
            return services;
        }
    }
}
