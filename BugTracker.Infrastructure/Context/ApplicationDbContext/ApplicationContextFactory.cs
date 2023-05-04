using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BugTracker.Infrastructure.Context.ApplicationDbContext
{
    public class ApplicationContextFactory : IDesignTimeDbContextFactory<ApplicationContext>
    {
        public ApplicationContext CreateDbContext(string[] args)
        {
            var host = Host.CreateDefaultBuilder()
                .ConfigureAppConfiguration((context, configuration) =>
                {
                    configuration.AddJsonFile(@"E:\vs2\BugTracker\BugTracker.Web.Api\appsettings.json");
                })
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();

            var configuration = host.Services.GetRequiredService<IConfiguration>();
            var connectionString = configuration.GetConnectionString("MSSQL");

            optionsBuilder.UseSqlServer(connectionString);

            return new ApplicationContext(optionsBuilder.Options);
        }
    }
}
