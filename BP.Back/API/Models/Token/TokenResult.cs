namespace API.Models.Login
{
	public class TokenResult
	{
		public int Expires_in { get; set; }
		public string Access_token { get; set; }
		public string Refresh_token { get; set; }
	}
}
