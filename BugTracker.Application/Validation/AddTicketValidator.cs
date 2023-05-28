using BugTracker.Application.Dtos.Ticket;
using FluentValidation;

namespace BugTracker.Application.Validation
{
    public class AddTicketValidator : AbstractValidator<AddTicketDto>
    {
        public AddTicketValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty()
                .WithMessage("'Title' must be filled.")
                .MaximumLength(40)
                .WithMessage("'Title' must be no longer than 40 characters");
            
            RuleFor(x => x.Description)
                .NotEmpty()
                .WithMessage("'Description' must be filled.")
                .MaximumLength(250)
                .WithMessage("'Description' must be no longer than 250 characters");
        }
    }
}
