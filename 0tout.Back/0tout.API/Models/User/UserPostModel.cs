using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _0tout.API.Models.User
{
    public class UserPostModel
    {
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime BirthDate { get; set; }
        public string Password { get; set; }
    }
}