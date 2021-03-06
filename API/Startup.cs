
using Application.Drivers;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Persistance;
using API.middleware;
using Domain;
using Microsoft.AspNetCore.Identity;
using Infrastructure.security;
using Application.Interfaces;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson()
            .AddFluentValidation(cfg =>
            {
                cfg.RegisterValidatorsFromAssemblyContaining<Create>();
            });
            services.AddDbContext<DataContext>(opt =>
              {
                  opt.UseSqlite(Configuration.GetConnectionString
                  ("DefaultConnection"));
              }
            );
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().
                      WithOrigins("http://localhost:3000");
                });
            });
           
            services.AddMediatR(typeof(List.Handler).Assembly);
             //here we are adding the code for identity generator
            var builder = services.AddIdentityCore<AppUser>();
            var identityBuilder= new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();
            services.AddAuthentication();

            //registering the interface created for JWT token
            services.AddScoped<IJwtGenerator, JwtGenerator>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {

                // app.UseDeveloperExceptionPage();
            }

            //  app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            app.UseRouting();

            //app.UseMvc();
            // app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
