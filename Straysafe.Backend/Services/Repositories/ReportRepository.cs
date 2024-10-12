using Microsoft.EntityFrameworkCore;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Data;

namespace Straysafe.Backend.Services.Repositories
{
    public class ReportRepository(ILogger<ReportRepository> logger, DatabaseContext databaseContext) : IRepository<Reports>
    {
        private readonly DatabaseContext _databaseContext = databaseContext;
        private readonly ILogger<ReportRepository> _logger = logger;

        public async Task<bool> AddAsync(Reports entity)
        {
            try
            {
                entity.Id = Guid.NewGuid();
                await _databaseContext.Reports.AddAsync(entity);
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
            var foundEntity = await GetAsync(id);

            if (foundEntity == null) return false;

            _databaseContext.Reports.Remove(foundEntity);
            await _databaseContext.SaveChangesAsync();
            return true;
        }

        public IEnumerable<Reports> GetAll()
        {
            return [.. _databaseContext.Reports];
        }

        public async Task<Reports?> GetAsync(Guid id)
        {
           return await _databaseContext.Reports.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateAsync(Reports entity)
        {
            try
            {
                _databaseContext.Reports.Update(entity);
                await _databaseContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message);
                return false;
            }
        }
    }
}
