using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Database.Interfaces;
using Database.Models;

namespace Database.Repositories
{
    public class BPUnitOfWork : IBPUnitOfWork
    {
        private BPContext _context;

        private TrackRepository _trackRepository;
        private UserRepository _userRepository;

        public BPUnitOfWork(BPContext context)
        {
            _context = context;
        }

        public TrackRepository TrackRepository
        {
            get
            {
                if (_trackRepository == null)
                {
                    _trackRepository = new TrackRepository(_context);
                }
                return _trackRepository;
            }
        }

        public UserRepository UserRepository
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new UserRepository(_context);
                }
                return _userRepository;
            }
        }
    }
}