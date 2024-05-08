using Database.Enums;
using Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
	public class Room : ITimeTracked
	{
		/// <summary>
		/// Identifier
		/// </summary>
		public Guid Id { get; set; }

		/// <summary>
		/// Name of the room
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// Spotify Access Token
		/// </summary>
		public string AccessToken { get; set; }

		/// <summary>
		/// Access Token expiration date
		/// </summary>
		public DateTime? AccessTokenExpireDate {  get; set; }

		/// <summary>
		/// Refresh Token
		/// </summary>
		public string RefreshToken { get; set; }

		/// <summary>
		/// Platform
		/// </summary>
		public Platform Platform { get; set; }

		/// <summary>
		/// Creation date
		/// </summary>
		public DateTime CreationDate { get; set; }

		/// <summary>
		/// Modification date
		/// </summary>
		public DateTime? ModificationDate { get; set; }
	}
}
