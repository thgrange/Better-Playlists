using Database.Models;
using Database.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Repositories
{
	public class ItemRepository : GenericRepository<Item>
	{
		internal ItemRepository(Context context) : base(context) { }

		//public ICollection<Item> GetWishlistItems(Guid wishlistId)
		//{
		//	return _dbSet.Where(x => x.WishlistId == wishlistId);
		//}
	}
}
