using Database.Interfaces.Context;
using Database.Interfaces.Models;
using Database.Models.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Repositories
{
	public class GenericRepository<TEntity> where TEntity : class
	{
		private Context _context { get; set; }
		private DbSet<TEntity> _dbSet { get; set; }

		internal GenericRepository(Context context)
		{
			_context = context;
			_dbSet = context.Set<TEntity>();
		}
		public virtual TEntity GetById(Guid id)
		{
			return _dbSet.Find(id);
		}

		public virtual void Update(TEntity entity)
		{
			_dbSet.Update(entity);
		}

		public virtual void Delete(Guid id)
		{
			TEntity entity = _dbSet.Find(id);
			Delete(entity);
		}

		public virtual void Delete(TEntity entity)
		{
			if (_context.Entry(entity).State == EntityState.Detached)
				_dbSet.Attach(entity);
			_dbSet.Remove(entity);
		}

		public virtual IEnumerable<TEntity> Query(Func<TEntity, bool> predicate)
		{
			return _dbSet.Where(predicate);
		}
	}
}
