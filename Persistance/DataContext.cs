using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Driver> Drivers { get; set; }
        // protected override void OnModelCreating(ModelBuilder builder)
        // {
        //     builder.Entity<Driver>().HasData(
        //        new Driver
        //        {
        //            id = uuid,
        //            name = "Abbas hamza",
        //            addres1 = "6 Plas",
        //            addres2 = "Butetown",
        //            city = "Cardiff",
        //            postCode = "Cf10 5HW",
        //            telphone = 123456789
        //        },
        //        new Driver
        //        {
        //            id = 2,
        //            name = "Alex WAde",
        //            addres1 = "22 Riad",
        //            addres2 = "Roath",
        //            city = "Taunton",
        //            postCode = "Cr09 5TY",
        //            telphone = 0133456789
        //        },
        //        new Driver
        //        {
        //            id = 3,
        //            name = "Steve Taylor",
        //            addres1 = "Lexius",
        //            addres2 = "BMW",
        //            city = "Cardiff",
        //            postCode = "BR01 6GY",
        //            telphone = 022256789
        //        }
        //     );
        // }
    }
}
