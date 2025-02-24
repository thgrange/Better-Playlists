using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Database.Repositories;

namespace Database.Interfaces
{
    public interface IBPUnitOfWork
    {
        TrackRepository TrackRepository { get; }
        UserRepository UserRepository { get; }
    }
}