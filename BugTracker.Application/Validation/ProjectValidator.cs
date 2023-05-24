using BugTracker.Application.Dtos.Project;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Application.Validation
{
    public class ProjectValidator : AbstractValidator<ProjectDto>
    {
        public ProjectValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(40)
                .WithMessage("'Name' must be no longer than 40 characters");
            RuleFor(x => x.Description).NotEmpty().MaximumLength(250)
                .WithMessage("'Description' must be no longer than 250 characters");
        }
    }
}
