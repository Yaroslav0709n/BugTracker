using BugTracker.Application;
using BugTracker.Application.IServices;
using BugTracker.Application.Services;
using BugTracker.Infrastructure;
using BugTracker.Infrastructure.Context;
using BugTracker.Web.Api.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Logging;
using BugTracker.Application.Mappings;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddAplication().AddInfrastructure();

builder.Services.AddDbContextService(builder.Configuration);
builder.Services.AddIdentityService();
builder.Services.AddCorsService();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGenService();
builder.Services.AddApplicationService();
builder.Services.AddAutoMapper(typeof(ProjectMapper).Assembly);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("MyPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
