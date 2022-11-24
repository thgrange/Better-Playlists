using Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Database.Interfaces.Context
{
	public interface IContext
	{
		DbSet<User> Users { get; set; }
		DbSet<Item> Items { get; set; }
		DbSet<Wishlist> Wishlists { get; set; }
	}
}
