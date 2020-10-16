using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace exercices
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public AuthController(IAuth auth, UserManager<IdentityUser> userManager)
        {
            Auth = auth;
            UserManager = userManager;
        }

        public IAuth Auth { get; }
        public UserManager<IdentityUser> UserManager { get; }

        [HttpPost("login")]
        public IActionResult Login([FromBody] IdentityUser user)
        {
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