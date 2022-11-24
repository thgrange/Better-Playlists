using Database.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Interfaces.Repositories
{
	public interface IUnitOfWork
	{
		UserRepository UserRepository { get; }
	}
}
