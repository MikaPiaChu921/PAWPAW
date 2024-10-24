using Microsoft.EntityFrameworkCore;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Data;

namespace Straysafe.Backend.Services.Repositories
{
    public class ChatDataRepository(DatabaseContext databaseContext, ILogger<ChatDataRepository> logger) : IRepository<ChatData>
    {
        private readonly DatabaseContext _databaseContext = databaseContext;
        private readonly ILogger<ChatDataRepository> _logger = logger;
        public async Task<bool> AddAsync(ChatData entity)
        {
            try
            {
                var res = await _databaseContext.ChatData.AddAsync(entity);
                return (await _databaseContext.SaveChangesAsync()) == 1;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                _logger.LogInformation(ex.StackTrace);
                return false;
            }
        }

        public Task<bool> DeleteAsync(Guid id)
        {
            // No delete for chat right now
            throw new NotImplementedException();
        }

        public IEnumerable<ChatData> GetAll()
        {
            return [.. _databaseContext.ChatData];
        }

        public async Task<ChatData?> GetAsync(Guid id)
        {
            return await _databaseContext.ChatData.FirstOrDefaultAsync(c => c.ChatInfo == id);
        }

        public Task<bool> UpdateAsync(ChatData entity)
        {
            // no update for chat right now
            throw new NotImplementedException();
        }
    }
}
