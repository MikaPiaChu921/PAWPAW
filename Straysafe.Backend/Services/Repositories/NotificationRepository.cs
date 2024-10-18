using Microsoft.EntityFrameworkCore;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Data;

namespace Straysafe.Backend.Services.Repositories
{
    public class NotificationRepository(DatabaseContext databaseContext) : IRepository<Notification>
    {
        private readonly DatabaseContext _databaseContext = databaseContext;

        public async Task<bool> AddAsync(Notification entity)
        {
            try
            {
                entity.Id = Guid.NewGuid();
                await _databaseContext.Notifications.AddAsync(entity);
                await _databaseContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var data = await GetAsync(id);
            if (data == null) return false;

            _databaseContext.Notifications.Remove(data);
            await _databaseContext.SaveChangesAsync();

            return true;
        }

        public IEnumerable<Notification> GetAll()
        {
            return [.. _databaseContext.Notifications];
        }

        public async Task<Notification?> GetAsync(Guid id)
        {
            return await _databaseContext.Notifications.FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<bool> UpdateAsync(Notification entity)
        {
            try
            {
                _databaseContext.Notifications.Update(entity);
                await _databaseContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex) { return false; }
        }
    }
}
