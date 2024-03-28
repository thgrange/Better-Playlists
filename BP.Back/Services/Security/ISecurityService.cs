namespace Services.Security
{
    public interface ISecurityService
    {
        string GenerateJSONWebToken(Guid id);
        string HashPassword(string password);
    }
}