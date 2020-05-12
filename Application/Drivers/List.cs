using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Drivers
{
    public class List
    {
        public class Query : IRequest<List<Driver>> { }

        public class Handler : IRequestHandler<Query, List<Driver>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Driver>> Handle(Query request, 
            CancellationToken cancellationToken)
            {
                var drivers = await _context.Drivers.ToListAsync();
                return drivers;
            }
        }
    }
}