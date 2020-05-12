using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistance;

namespace Application.Drivers
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid id { get; set; }
            public string name { get; set; }
            public string addres1 { get; set; }
            public string addres2 { get; set; }
            public string city { get; set; }
            public string postCode { get; set; }
            public int? telphone { get; set; }
        }

         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.name).NotEmpty();
                RuleFor(x => x.addres1).NotEmpty();
                RuleFor(x => x.addres2).NotEmpty();
                RuleFor(x => x.city).NotEmpty();
                RuleFor(x => x.postCode).NotEmpty();
                RuleFor(x => x.telphone).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var driver = await _context.Drivers.FindAsync(request.id);
                if (driver == null)
                 if (driver == null)
                    throw new RestException(
                HttpStatusCode.NotFound, new {driver = "Not Found"});


                driver.name = request.name ?? driver.name;
                driver.addres1 = request.addres1 ?? driver.addres1;
                driver.addres2 = request.addres2 ?? driver.addres2;
                driver.city = request.city ?? driver.city;
                driver.postCode = request.postCode ?? driver.postCode;
                driver.telphone = request.telphone ?? driver.telphone ;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception(" Problem saving data");
            }
        }
    }
}