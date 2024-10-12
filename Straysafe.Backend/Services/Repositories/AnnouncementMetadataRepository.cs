using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Data;

namespace Straysafe.Backend.Services.Repositories
{
    public class AnnouncementMetadataRepository(DatabaseContext databaseContext, ILogger<AnnouncementMetadataRepository> logger) : IRepositoryExtension<AnnouncementMetadata>
    {
        private readonly DatabaseContext _databaseContext = databaseContext;
        private readonly ILogger<AnnouncementMetadataRepository> _logger = logger;
        public async Task<bool> AddAsync(AnnouncementMetadata entity)
        {
            try
            {
                await _databaseContext.AnnouncementMetadata.AddAsync(entity);
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

            _databaseContext.AnnouncementMetadata.Remove(entity);
            await _databaseContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await GetAsync(id);
            if (entity == null) return false;

            _databaseContext.AnnouncementMetadata.Remove(entity);
            await _databaseContext.SaveChangesAsync();

            return true;
        }

        public IEnumerable<AnnouncementMetadata> GetAll()
        {
            return [.. _databaseContext.AnnouncementMetadata];
        }

        public async Task<AnnouncementMetadata?> GetAsync(Guid id)
        {
            return await _databaseContext.AnnouncementMetadata.FirstOrDefaultAsync(a => a.AnnouncementId == id);
        }

        public async Task<AnnouncementMetadata?> GetAsync(int id)
        {
            return await _databaseContext.AnnouncementMetadata.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<bool> UpdateAsync(AnnouncementMetadata entity)
        {
            try
            {
                _databaseContext.AnnouncementMetadata.Update(entity);
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
