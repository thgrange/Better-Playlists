using _0tout.DB.Interfaces;

namespace _0tout.DB.Models
{
    public class User : ITimeTracked
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime BirthDate { get; set; }
        public string Password { get; set; }
        public string ProfilePicture { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ModificationDate { get; set; }
    }
}