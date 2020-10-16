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
        public JWTAuth(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public string Auth(IdentityUser user)
        {
            if(string.IsNullOrEmpty(user.Email))
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
                        new Claim(ClaimTypes.Name, user.Email)
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
