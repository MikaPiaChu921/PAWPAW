using Microsoft.AspNetCore.Mvc;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Services.Repositories;

namespace Straysafe.Backend.Controllers
{
    public class BaseController: Controller
    {
        public IRepository<User> UserRepository { get; }
        public IRepository<Reports> ReportRepository { get; }
        public IRepository<ChatInformation> ChatInformationRepository { get; }
        public IRepository<ChatData> ChatDataRepository { get; }
        public IRepository<Announcement> AnnouncementRepository { get; }
        public IRepository<AnnouncementMetadata> AnnouncementMetadataRepository { get; }
        public IRepository<Notification> NotificationRepository { get; }
        public IRepository<Donation> DonationRepository { get; }

        public BaseController(IServiceProvider serviceProvider)
        {
            var scope = serviceProvider.CreateScope();

            this.UserRepository = scope.ServiceProvider.GetRequiredService<IRepository<User>>();
            this.ReportRepository = scope.ServiceProvider.GetRequiredService<IRepository<Reports>>();
            this.ChatInformationRepository = scope.ServiceProvider.GetRequiredService<IRepository<ChatInformation>>();
            this.ChatDataRepository = scope.ServiceProvider.GetRequiredService<IRepository<ChatData>>();
            this.AnnouncementRepository = scope.ServiceProvider.GetRequiredService<IRepository<Announcement>>();
            this.AnnouncementMetadataRepository = scope.ServiceProvider.GetRequiredService<IRepositoryExtension<AnnouncementMetadata>>();
            this.NotificationRepository = scope.ServiceProvider.GetRequiredService<IRepository<Notification>>();
            this.DonationRepository = scope.ServiceProvider.GetRequiredService<IRepository<Donation>>();
        }

        protected async Task<User?> GetUser(string Id)
        {
            _ = Guid.TryParse(Id, out Guid userId);

            return await UserRepository.GetAsync(userId);
        }

        protected async void AddNotification(string userId, string Type, string Message)
        {
            var user = await GetUser(userId);
            if (user == null) return;

            Notification notification = new()
            {
                Type = Type,
                Description = $"{user.FirstName} {user.LastName} has {Message}",
                Created = DateTime.Now,
            };

            await NotificationRepository.AddAsync(notification);
        }


    }
}
