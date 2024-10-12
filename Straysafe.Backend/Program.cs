
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Data;
using Straysafe.Backend.Hubs;
using Straysafe.Backend.Services.Chat;
using Straysafe.Backend.Services.Repositories;

namespace Straysafe.Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<DatabaseContext>( options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<IRepository<User>, UserRepository>();
            builder.Services.AddScoped<IRepository<Reports>, ReportRepository>();
            builder.Services.AddScoped<IRepository<ChatInformation>, ChatInformationRepository>();
            builder.Services.AddScoped<IRepository<ChatData>, ChatDataRepository>();
            builder.Services.AddScoped<IRepository<Announcement>, AnnouncementRepository>();
            builder.Services.AddScoped<IRepositoryExtension<AnnouncementMetadata>, AnnouncementMetadataRepository>();

            builder.Services.AddSingleton<SessionSingleton>();

            builder.Services.AddScoped<ChatHandler>();
            builder.Services.AddScoped<ChatHub>();
            builder.Services.AddSignalR();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(options => options.SetIsOriginAllowed(x => _ = true).AllowAnyMethod().AllowCredentials().AllowAnyHeader());

            //app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthorization();


            app.MapControllers();
            // chathub endpoint
            app.UseEndpoints(endpoints =>
            {
                var h = endpoints.MapHub<ChatHub>("/chathub");
            });

            app.Run();
        }
    }
}
