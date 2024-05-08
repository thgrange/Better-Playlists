using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices.Spotify.Models.Auth
{
	public class Tokens
	{
		public int Expires_in { get; set; }
		public string Access_token { get; set; }
		public string Refresh_token { get; set; }
	}
}
