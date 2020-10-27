using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
namespace exercices
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public AuthController(IAuth auth, UserManager<IdentityUser> userManager, Context context)
        {
            Auth = auth;
            UserManager = userManager;
            Context = context;
        }

        public IAuth Auth { get; }
        public UserManager<IdentityUser> UserManager { get; }
        public Context Context { get; }

        [HttpPost("login")]
        public IActionResult Login([FromBody] IdentityUser user)
        {
            var dbUser = Context.Users.FirstOrDefault(u => u.UserName == user.UserName && u.PasswordHash == user.PasswordHash);
            if (dbUser is null)
                return NotFound();

            var token = Auth.Auth(user);
            if (token is null)
                return Unauthorized();
            else
                return Ok(token);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] IdentityUser user)
        {
            var identityResult =  await UserManager.CreateAsync(user);
            if (identityResult.Succeeded)
            {
                var token = Auth.Auth(user);
                if (token is null)
                    return Unauthorized();
                else
                    return Ok(token);
            }
            else
                return BadRequest();

        }
    }
}