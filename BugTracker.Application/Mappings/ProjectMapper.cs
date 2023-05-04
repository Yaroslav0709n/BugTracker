using AutoMapper;
using BugTracker.Application.Dtos;
using BugTracker.Domain.Entities;


namespace BugTracker.Application.Mappings
{
    public class ProjectMapper:Profile
    {
        public ProjectMapper()
        {
            CreateMap<ProjectDto, Project>();
        }
    }
}
