using Database.Interfaces;
using Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Database.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly BPContext _context;
        protected DbSet<T> _entities;

        public Repository(BPContext context)
        {
            _context = context;
            _entities = context.Set<T>();
        }

        public T GetById(Guid id)
        {
            return _entities.Find(id);
        }

        public IEnumerable<T> GetAll()
        {
            return _entities.ToList();
        }

        public void Add(T entity)
        {
            _entities.Add(entity);
            _context.SaveChanges();
        }

        public void Update(T entity)
        {
            _entities.Update(entity);
            _context.SaveChanges();
        }

        public void Delete(T entity)
        {
            _entities.Remove(entity);
            _context.SaveChanges();
        }

        public IEnumerable<T> Query(Func<T, bool> predicate)
        {
            return _entities.Where(predicate);
        }
    }
}