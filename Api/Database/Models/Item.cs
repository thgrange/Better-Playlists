using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
	public class Item
	{
		public Guid Id { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public Guid WishlistId { get; set; }

		[ForeignKey("WishlistId")]
		public virtual Wishlist Wishlist { get; set; }

		public float Price { get; set; }

		public bool IsHidden { get; set; }

		public bool IsFullfilled { get; set; }
	}
}
