using BugTracker.Application.Dtos.User;
using FluentValidation;

namespace BugTracker.Application.Validation
{
    public class RegisterUserValidator : AbstractValidator<RegisterDto>
    {
        public RegisterUserValidator() 
        {
            RuleFor(register => register.Email).EmailAddress();

            RuleFor(register => register.FirstName)
                .NotEmpty()
                .WithMessage("'First name' must be filled.")
                .MaximumLength(250);
            
            RuleFor(register => register.LastName)
                .NotEmpty()
                .WithMessage("'Last name' must be filled.")
                .MaximumLength(250);
            
            RuleFor(register => register.Password)
                .NotEmpty()
                .WithMessage("'Password' must be filled.")
                .MinimumLength(6)
                .WithMessage("'Password' must be at least 6 characters long");
        }
    }
}
