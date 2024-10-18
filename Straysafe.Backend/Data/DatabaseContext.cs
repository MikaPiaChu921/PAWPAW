using Microsoft.EntityFrameworkCore;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Helper;

namespace Straysafe.Backend.Data
{
    public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Reports> Reports { get; set; }
        public DbSet<ChatData> ChatData { get; set; }
        public DbSet<ChatInformation> ChatInformation { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<AnnouncementMetadata> AnnouncementMetadata { get; set; }
        public DbSet<Donation> Donations { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(
                [
                    new User { 
                        Id = Guid.NewGuid(),
                        Email = "admin",
                        Password = Hasher.HashSHA512("P@ssw0rd"),
                        Role = "Admin",
                        FirstName = "System",
                        LastName = "Administrator",
                    }
                ]
            );
        }
    }
}
