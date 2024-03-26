namespace Services.Interfaces
{
    public interface ISecurityService
    {
        string GenerateJSONWebToken(Guid id);
        string HashPassword(string password);
    }
}