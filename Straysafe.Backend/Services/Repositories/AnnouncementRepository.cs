using Microsoft.EntityFrameworkCore;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Data;

namespace Straysafe.Backend.Services.Repositories
{
    public class AnnouncementRepository(DatabaseContext databaseContext, ILogger<AnnouncementRepository> logger) : IRepository<Announcement>
    {
        private readonly DatabaseContext _databaseContext = databaseContext;
        private readonly ILogger<AnnouncementRepository> _logger = logger;
        public async Task<bool> AddAsync(Announcement entity)
        {
            try
            {
                entity.Id = Guid.NewGuid();
                await _databaseContext.Announcements.AddAsync(entity);
                await _databaseContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await GetAsync(id);
            if (entity == null) return false;

            _databaseContext.Announcements.Remove(entity);
            await _databaseContext.SaveChangesAsync();

            return true;
        }

        public IEnumerable<Announcement> GetAll()
        {
            return [.. _databaseContext.Announcements];
        }

        public async Task<Announcement?> GetAsync(Guid id)
        {
            return await _databaseContext.Announcements.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<bool> UpdateAsync(Announcement entity)
        {
            try
            {
                _databaseContext.Announcements.Update(entity);
                await _databaseContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }
    }
}
