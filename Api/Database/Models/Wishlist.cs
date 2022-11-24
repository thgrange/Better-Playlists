using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
	public class Wishlist
	{
		public Guid Id { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public virtual ICollection<Item> Items { get; set; }

		public bool IsHidden { get; set; }
	}
}
