using Database.Interfaces.Repositories;
using Database.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Repositories
{
	public class UnitOfWork : IUnitOfWork
	{
		private Context _context;

		public UnitOfWork(Context context)
		{
			_context = context;
		}

		private UserRepository _userRepository;

		public UserRepository UserRepository
		{
			get
			{
				if (_userRepository == null)
					_userRepository = new UserRepository(_context);
				return _userRepository;
			}
		}
	}
}
