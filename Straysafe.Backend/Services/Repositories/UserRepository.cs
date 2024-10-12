using Microsoft.EntityFrameworkCore;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Data;

namespace Straysafe.Backend.Services.Repositories
{
    public class UserRepository(DatabaseContext databaseContext, ILogger<UserRepository> logger) : IRepository<User>
    {
        private readonly DatabaseContext _databaseContext = databaseContext;
        private readonly ILogger<UserRepository> _logger = logger;

        public async Task<bool> AddAsync(User entity)
        {
            try
            {
                // avoid duplicate emails
                var existingData = GetAll().FirstOrDefault(x => x.Email == entity.Email);
                if (existingData != null) return false;

                entity.Id = Guid.NewGuid();
                await _databaseContext.Users.AddAsync(entity);
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
            var user = await GetAsync(id);
            if (user == null) return false;

            _databaseContext.Users.Remove(user);
            await _databaseContext.SaveChangesAsync();

            return true;
        }

        public async Task<User?> GetAsync(Guid id)
        {
            return await _databaseContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public IEnumerable<User> GetAll()
        {
            return [.. _databaseContext.Users];
        }

        public async Task<bool> UpdateAsync(User entity)
        {
            try
            {
                _databaseContext.Users.Update(entity);
                await _databaseContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
            return true;
        }
    }
}
