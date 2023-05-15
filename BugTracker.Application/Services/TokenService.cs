using BugTracker.Application.Common;
using BugTracker.Application.IServices;
using BugTracker.Domain.Entities.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace BugTracker.Application.Services
{
    public class TokenService : ITokenService
    {
        public string CreateToken(ApplicationUser user)
        {
            List<Claim> claim = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, user.Role),
                };

            var authSigningKeys = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AuthOptions.KEY));

            var token = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                expires: DateTime.Now.AddHours(3),
                claims: claim,
                signingCredentials: new SigningCredentials(authSigningKeys, SecurityAlgorithms.HmacSha256)
                );

            return JsonSerializer.Serialize(new { token = new JwtSecurityTokenHandler().WriteToken(token) });

        }
    }
}
