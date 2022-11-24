using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Interfaces.Models
{
	public interface IDated
	{
		DateTime? CreationDate { get; set; }
		DateTime? ModificationDate { get; set; }
	}
}
