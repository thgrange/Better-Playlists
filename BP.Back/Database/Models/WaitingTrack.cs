using Database.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Models
{
	public class WaitingTrack : ITimeTracked
	{
		/// <summary>
		/// Identifier
		/// </summary>
		public Guid Id { get; set; }

		/// <summary>
		/// Track id on platforms
		/// </summary>
		public string TrackId { get; set; }

		/// <summary>
		/// Room identifier
		/// </summary>
		public Guid RoomId { get; set; }

		/// <summary>
		/// Room
		/// </summary>
		[ForeignKey(nameof(RoomId))]
		public virtual Room Room { get; set; }

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
