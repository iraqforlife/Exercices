using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace exercices
{
    public interface IAuth
    {
        string Auth(User user);
    }
}
