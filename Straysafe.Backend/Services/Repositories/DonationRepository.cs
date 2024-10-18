using Microsoft.EntityFrameworkCore;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Data;

namespace Straysafe.Backend.Services.Repositories
{
    public class DonationRepository(DatabaseContext databaseContext) : IRepository<Donation>
    {
        private readonly DatabaseContext _databaseContext = databaseContext;

        public async Task<bool> AddAsync(Donation entity)
        {
            try
            {
                entity.Id = Guid.NewGuid();
                await _databaseContext.Donations.AddAsync(entity);
                await _databaseContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex) {
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var data = await GetAsync(id);
            if (data == null) return false;

            _databaseContext.Donations.Remove(data);
            await _databaseContext.SaveChangesAsync();

            return true;
        }

        public IEnumerable<Donation> GetAll()
        {
            return [.. _databaseContext.Donations];
        }

        public async Task<Donation?> GetAsync(Guid id)
        {
            return await _databaseContext.Donations.FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<bool> UpdateAsync(Donation entity)
        {
            try
            {
                _databaseContext.Donations.Update(entity);
                await _databaseContext.SaveChangesAsync();
                return true;
            }catch(Exception ex) { return false; }
        }
    }
}
