namespace Straysafe.Backend.Services.Repositories
{
    public interface IRepository<T> where T : class
    {
        public Task<T?> GetAsync(Guid id);
        public IEnumerable<T> GetAll();
        public Task<bool> AddAsync(T entity);
        public Task<bool> UpdateAsync(T entity);
        public Task<bool> DeleteAsync(Guid id);
    }
}
