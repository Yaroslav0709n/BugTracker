using BugTracker.Application.Dtos.Commentary;
using FluentValidation;

namespace BugTracker.Application.Validation
{
    public class AddCommentaryValidator:AbstractValidator<AddCommentaryDto>
    {
        public AddCommentaryValidator()
        {
            RuleFor(x => x.Text)
                .NotEmpty()
                .WithMessage("'Text' must be filled")
                .MaximumLength(1000)
                .WithMessage("'Text' must be no longer than 1000 characters");
        }
    }
}
