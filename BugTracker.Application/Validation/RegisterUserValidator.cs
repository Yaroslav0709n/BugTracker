using BugTracker.Application.Dtos.User;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTracker.Application.Validation
{
    public class RegisterUserValidator : AbstractValidator<RegisterDto>
    {
        public RegisterUserValidator() 
        {
            RuleFor(register => register.Email).EmailAddress();
            RuleFor(register => register.FirstName).NotEmpty().MinimumLength(1).MaximumLength(250);
            RuleFor(register => register.LastName).NotEmpty().MinimumLength(1).MaximumLength(250);
            RuleFor(register => register.Password).NotEmpty().MinimumLength(6)
                .WithMessage("'Password' must be at least 6 characters long");
        }
    }
}
