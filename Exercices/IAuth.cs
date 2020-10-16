using Microsoft.AspNetCore.Identity;

namespace exercices
{
    public interface IAuth
    {
        string Auth(IdentityUser user);
    }
}
