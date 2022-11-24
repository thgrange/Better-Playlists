using Database.Models;
using Database.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Repositories
{
	public class UserRepository : GenericRepository<User>
	{
		internal UserRepository(Context context) : base(context) { }
	}
}
