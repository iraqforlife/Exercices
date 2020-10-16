using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography.Xml;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace exercices
{
    public class JWTAuth : IAuth
    {
        public JWTAuth(IConfiguration configuration, Context context)
        {
            Configuration = configuration;
            Context = context;
        }

        public IConfiguration Configuration { get; }
        public Context Context { get; }

        public string Auth(IdentityUser user)
        {
            if (string.IsNullOrEmpty(user.UserName) || 
                !Context.Users.Any(u =>u.UserName == user.UserName) ||
                Context.Users.First(u => u.UserName == user.UserName).PasswordHash != user.PasswordHash)
            {
                return null;
            }
            else
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Configuration["jwtKey"];
                var tokenDesc = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.UserName)
                    }),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDesc);
                return tokenHandler.WriteToken(token);
            }
        }
    }
}
