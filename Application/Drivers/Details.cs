using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistance;


namespace Application.Drivers
{
    public class Details
    {
        public class Query : IRequest<Driver>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Driver>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Driver> Handle(Query request, CancellationToken cancellationToken)
            {

                var driver = await _context.Drivers.FindAsync(request.Id);
                if (driver == null)
                    throw new RestException(
                HttpStatusCode.NotFound, new { driver = "Not Found" });

                return driver;
            }
        }
    }


}
