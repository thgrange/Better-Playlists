using Database.Interfaces.Context;
using Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models.Context
{
    public class Context : DbContext, IContext
    {
        public Context(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
		public DbSet<Item> Items { get; set; }
		public DbSet<Wishlist> Wishlists { get; set; }
	}
}
