using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistance;

namespace Application.Drivers
{
    public class Create
    {
        public class Command : IRequest
        {

            public Guid id { get; set; }
            public string name { get; set; }
            public string addres1 { get; set; }
            public string addres2 { get; set; }
            public string city { get; set; }
            public string postCode { get; set; }
            public int telphone { get; set; }
        }

        //validation for our model
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
                var driver = new Driver
                {
                    id = request.id,
                    name = request.name,
                    addres1 = request.addres1,
                    addres2 = request.addres2,
                    city = request.city,
                    postCode = request.postCode,
                    telphone = request.telphone

                };

                _context.Drivers.Add(driver);
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception(" Problem saving data");
            }
        }
    }
}