using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Driver> Drivers { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            
            builder.Entity<Driver>().HasData(
               new Driver
               {
                   id = Guid.NewGuid(),
                   name = "Abbas hamza",
                   addres1 = "6 Plas",
                   addres2 = "Butetown",
                   city = "Cardiff",
                   postCode = "Cf10 5HW",
                   telphone = 123456789
               },
               new Driver
               {
                   id = Guid.NewGuid(),
                   name = "Alex WAde",
                   addres1 = "22 Riad",
                   addres2 = "Roath",
                   city = "Taunton",
                   postCode = "Cr09 5TY",
                   telphone = 0133456789
               },
               new Driver
               {
                   id = Guid.NewGuid(),
                   name = "Steve Taylor",
                   addres1 = "Lexius",
                   addres2 = "BMW",
                   city = "Cardiff",
                   postCode = "BR01 6GY",
                   telphone = 022256789
               }
            );
        }
    }
}
