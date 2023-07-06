using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _0tout.DB.Interfaces;
using _0tout.DB.Models;

namespace _0tout.DB.Repositories
{
    public class ZeroUnitOfWork : IZeroUnitOfWork
    {
        private UserRepository _userRepository;
        private ZeroContext _context;

        public ZeroUnitOfWork(ZeroContext context)
        {
            _context = context;
        }

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