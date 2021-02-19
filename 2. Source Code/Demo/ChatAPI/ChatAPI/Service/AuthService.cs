using ChatAPI.DAO;
using ChatAPI.DTO;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ChatAPI.Service
{
    public class AuthService
    {
        private static AuthService instance;

        public static AuthService Instance
        {
            get
            {
                if (instance == null) instance = new AuthService();
                return instance;
            }
            private set { instance = value; }

        }

        public Dictionary<string, object> GetToken(string username, string password, string securityKey, string issuer, string audience)
        {
            // symmetric security key
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            // signing credentials
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            if (username != null && password != null)
            {
                Account account = AccountDAO.Instance.GetAccountByUsernameAndPassword(username, password);
                if (account != null)
                {
                    //add claims
                    var claims = new List<Claim>();
                    claims.Add(new Claim(ClaimTypes.Role, "User"));
                    claims.Add(new Claim(ClaimTypes.NameIdentifier, account.ID + ""));
                    claims.Add(new Claim("ID", account.ID.ToString()));

                    // create token
                    var token = new JwtSecurityToken(
                        issuer: issuer,
                        audience: audience,
                        expires: DateTime.Now.AddDays(30),
                        signingCredentials: signingCredentials,
                        claims: claims
                    );
                    Dictionary<string, object> res = new Dictionary<string, object>();
                    res.Add("code", "LOGIN_SUCCESSFULY");
                    res.Add("account", account);
                    res.Add("token", new JwtSecurityTokenHandler().WriteToken(token));
                    return res;
                }
            }
            Dictionary<string, object> response = new Dictionary<string, object>();
            response.Add("code", "LOGIN_FAILED");
            return response;
        }
    }
}
