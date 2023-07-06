using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _0tout.DB.Repositories;

namespace _0tout.DB.Interfaces
{
    public interface IZeroUnitOfWork
    {
        UserRepository UserRepository { get; }
    }
}