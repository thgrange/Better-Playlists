using Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Repositories
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(BPContext context) : base(context) { }

        public User GetUserWithToken(string token)
        {
            var user = _context.Users.FirstOrDefault(x => x.Token == token);

            return user;
        }

        public User GetUserWithPlatformId(string platformId)
        {
            var user = _context.Users.FirstOrDefault(x => x.PlatformId == platformId);

            return user;
        }

        public User ChangeTokenOrRegister(string token, string id)
        {
            var user = GetUserWithPlatformId(token);

            if (user == null)
            {
                user = new User
                {
                    PlatformId = id,
                    CreationDate = DateTime.Now,
                    ModificationDate = DateTime.Now,
                    Token = token
                };
                _context.Users.Add(user);
            }
            else
            {
                user.Token = token;
                _context.Users.Update(user);
            }
            _context.SaveChanges();

            return user;
        }
    }
}
