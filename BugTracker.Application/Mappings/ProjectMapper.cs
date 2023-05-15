using AutoMapper;
using BugTracker.Application.Dtos.Project;
using BugTracker.Domain.Entities;
using BugTracker.Domain.Entities.Identity;

namespace BugTracker.Application.Mappings
{
    public class ProjectMapper:Profile
    {
        public ProjectMapper()
        {
            CreateMap<ProjectDto, Project>();
            CreateMap<Project, ProjectDto>();

            CreateMap<UpdateProjectDto, Project>();
            CreateMap<Project, UpdateProjectDto>();

            CreateMap<ApplicationUser, UsersProjectsDto>();
            CreateMap<UsersProjectsDto, ApplicationUser>();
        }
    }
}
