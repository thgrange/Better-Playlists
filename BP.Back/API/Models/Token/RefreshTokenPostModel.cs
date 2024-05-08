namespace API.Models.Login
{
    public class RefreshTokenPostModel
	{
        public string RedirectUri { get; set; }
        public string RefreshToken { get; set; }
	}
}