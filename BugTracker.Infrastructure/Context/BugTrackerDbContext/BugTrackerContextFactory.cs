using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BugTracker.Infrastructure.Context.ApplicationDbContext
{
    public class BugTrackerContextFactory : IDesignTimeDbContextFactory<BugTrackerContext>
    {
        public BugTrackerContext CreateDbContext(string[] args)
        {
            var host = Host.CreateDefaultBuilder()
                .ConfigureAppConfiguration((context, configuration) =>
                {
                    configuration.AddJsonFile(@"BugTracker.Web.Api\appsettings.json");
                })
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<BugTrackerContext>();

            var configuration = host.Services.GetRequiredService<IConfiguration>();
            var connectionString = configuration.GetConnectionString("MSSQL");

            optionsBuilder.UseSqlServer(connectionString);

            return new BugTrackerContext(optionsBuilder.Options);
        }
    }
}
