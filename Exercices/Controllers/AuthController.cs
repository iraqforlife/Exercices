using Microsoft.AspNetCore.Mvc;

namespace exercices
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public AuthController(IAuth auth)
        {
            Auth = auth;
        }

        public IAuth Auth { get; }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var token = Auth.Auth(user);
            if (token is null)
                return Unauthorized();
            else
                return Ok(token);
        }
    }
}