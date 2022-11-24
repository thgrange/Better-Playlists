using Database.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
	public class User : IIdentifier, IDated
	{
		/// <summary>
		/// Unique identifier
		/// </summary>
		public Guid Id { get; set; }

		/// <summary>
		/// Firstname of the user
		/// </summary>
		public string Firstname { get; set; }

		/// <summary>
		/// Lastname of the user
		/// </summary>
		public string Lastname { get; set; }

		/// <summary>
		/// Password of the user
		/// </summary>
		public string Password { get; set; }

		/// <summary>
		/// Email of the user
		/// </summary>
		public string Email { get; set; }

		/// <summary>
		/// Creation date
		/// </summary>
		public DateTime? CreationDate { get; set; }

		/// <summary>
		/// Modification date
		/// </summary>
		public DateTime? ModificationDate { get; set; }
	}
}
