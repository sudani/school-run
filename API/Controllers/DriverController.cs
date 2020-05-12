using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;
using System.Threading.Tasks;
using MediatR;
using Application.Drivers;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {

        private readonly IMediator _mediator;

        public DriverController(IMediator mediator)
        {
            _mediator = mediator;


        }
        [HttpGet]
        public async Task<ActionResult<List<Driver>>> Get()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Driver>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }


        // public async Task<ActionResult<Driver>> GET(int id)
        // {
        //     var drivers = await _context.Drivers.FindAsync(id);
        //     return Ok(drivers);
        // }
        

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit 
        (Guid id,Edit.Command command)
        {
            command.id = id;
            return await _mediator.Send(command);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command {Id=id});
        }
    }
}