using BugTracker.Application.Dtos.Project;
using FluentValidation;

namespace BugTracker.Application.Validation
{
    public class ProjectValidator : AbstractValidator<ProjectDto>
    {
        public ProjectValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("'Name' must be filled")
                .MaximumLength(40)
                .WithMessage("'Name' must be no longer than 40 characters");

            RuleFor(x => x.Description)
                .NotEmpty()
                .WithMessage("'Description' must be filled")
                .MaximumLength(250)
                .WithMessage("'Description' must be no longer than 250 characters");
        }
    }
}
