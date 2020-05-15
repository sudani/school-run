
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistance
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager )
        {

            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                   new AppUser
                   {
                       DisplayName= "Ibsin",
                       UserName= "ibsin",
                       Email = "ibsin@test.com"
                   } ,
                   new AppUser
                   {
                       DisplayName= "Bill",
                       UserName= "bill",
                       Email = "bill@test.com"
                   } ,
                   new AppUser
                   {
                       DisplayName= "Tom",
                       UserName= "tom",
                       Email = "tom@test.com"
                   } 
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            if (!context.Drivers.Any())
            {
                var drivers = new List<Driver>
                {



               new Driver
               {
                  
                   name = "Abbas hamza",
                   addres1 = "6 Plas",
                   addres2 = "Butetown",
                   city = "Cardiff",
                   postCode = "Cf10 5HW",
                   telphone = 123456789
               },
               new Driver
               {
                   
                   name = "Alex WAde",
                   addres1 = "22 Riad",
                   addres2 = "Roath",
                   city = "Taunton",
                   postCode = "Cr09 5TY",
                   telphone = 0133456789
               },
               new Driver
               {
                  
                   name = "Steve Taylor",
                   addres1 = "Lexius",
                   addres2 = "BMW",
                   city = "Cardiff",
                   postCode = "BR01 6GY",
                   telphone = 022256789
               }

                };
                context.Drivers.AddRange(drivers);
                context.SaveChanges();
            }
        }
    }
}