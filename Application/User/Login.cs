using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

using Application.Errors;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();

            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _sinInManager;

            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> sinInManager)
            {
                _sinInManager = sinInManager;
                _userManager = userManager;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if(user == null)
                throw new RestException(HttpStatusCode.Unauthorized);
                var result = await _sinInManager.CheckPasswordSignInAsync(user,
                request.Password, false);
                if(result.Succeeded)
                {
                    return new User
                    {
                        DisplayName= user.DisplayName,
                        Token = "Token here",
                        UserName = user.UserName,
                        Image = null
                    };
                }
                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}