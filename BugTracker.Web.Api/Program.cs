using BugTracker.Application;
using BugTracker.Web.Api.Extensions;
using BugTracker.Application.Mappings;
using FluentValidation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
}).AddFluentValidation();

builder.Services.AddAplication().AddInfrastructure();

builder.Services.AddDbContextService(builder.Configuration);
builder.Services.AddIdentityService();
builder.Services.AddCorsService();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGenService();
builder.Services.AddApplicationService();
builder.Services.AddValidationService();
builder.Services.AddAutoMapper(typeof(ProjectMapper).Assembly);
builder.Services.AddMemoryCache();
builder.Services.AddHttpContextAccessor();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseCustomExceptionHandler();
app.UseCors("MyPolicy");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
