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

        public BPUnitOfWork(BPContext context)
        {
            _context = context;
        }
    }
}