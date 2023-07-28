using BugTracker.Application.Dtos.User;
using FluentValidation;

namespace BugTracker.Application.Validation
{
    public class RegisterUserValidator : AbstractValidator<RegisterDto>
    {
        public RegisterUserValidator() 
        {
            RuleFor(register => register.Email)
                .EmailAddress()
                .WithMessage("'Email' field is not a valid e-mail address");

            RuleFor(register => register.FirstName)
                .NotEmpty()
                .WithMessage("'First name' must be filled")
                .MaximumLength(250)
                .WithMessage("'First name' must be no longer than 250 characters");


            RuleFor(register => register.LastName)
                .NotEmpty()
                .WithMessage("'Last name' must be filled")
                .MaximumLength(250)
                .WithMessage("'Last name' must be no longer than 250 characters");

            RuleFor(register => register.Password)
                .NotEmpty()
                .WithMessage("'Password' must be filled")
                .MinimumLength(6)
                .WithMessage("'Password' must be at least 6 characters long");
        }
    }
}
