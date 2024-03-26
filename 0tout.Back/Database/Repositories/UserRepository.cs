using Database.Models;

namespace Database.Repositories
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(ZeroContext context) : base(context) {}

        public User GetUserByEmailAndPassword(string email, string password)
        {
            return _entities.Where(x => x.Email == email && x.Password == password).FirstOrDefault();
        }

        public bool IsAnyUserWithSameEmail(string email)
        {
            return _entities.Where(x => x.Email == email).Any();
        }
    }
}