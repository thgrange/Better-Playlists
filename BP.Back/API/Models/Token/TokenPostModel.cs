namespace API.Models.Login
{
    public class TokenPostModel
    {
        public string RedirectUri { get; set; }
        public string Code { get; set; }
	}
}