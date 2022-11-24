using Database.Models;
using Database.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Repositories
{
	public class WishlistRepository : GenericRepository<Wishlist>
	{
		internal WishlistRepository(Context context) : base(context) { }
	}
}
