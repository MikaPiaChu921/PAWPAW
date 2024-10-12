using Microsoft.EntityFrameworkCore;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Data;

namespace Straysafe.Backend.Services.Repositories
{
    public class ChatInformationRepository(DatabaseContext databaseContext) : IRepository<ChatInformation>
    {
        private readonly DatabaseContext _databaseContext = databaseContext;

        public async Task<bool> AddAsync(ChatInformation entity)
        {
            try
            {
                var data = await _databaseContext.ChatInformation.AddAsync(entity);
                await _databaseContext.SaveChangesAsync();
                return data != null;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public Task<bool> DeleteAsync(Guid id)
        {
            // no delete
            throw new NotImplementedException();
        }

        public IEnumerable<ChatInformation> GetAll()
        {
            return [.. _databaseContext.ChatInformation];
        }

        public async Task<ChatInformation?> GetAsync(Guid id)
        {
            return await _databaseContext.ChatInformation.FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<bool> UpdateAsync(ChatInformation entity)
        {
            // no update
            throw new NotImplementedException();
        }
    }
}
