namespace Straysafe.Backend.Services.Repositories
{
    public interface IRepositoryExtension<T> : IRepository<T> where T : class
    {
        public Task<T?> GetAsync(int id);
        public Task<bool> DeleteAsync(int id);
    }
}
