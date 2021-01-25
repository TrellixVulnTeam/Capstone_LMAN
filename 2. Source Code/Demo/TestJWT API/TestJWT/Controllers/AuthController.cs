using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.Globalization;
using TestJWT.DTO;
using Newtonsoft.Json;
using TestJWT.ViewModel;
using TestJWT.DAO;

namespace TestJWT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AuthController : ControllerBase
    {
        public AuthController(IConfiguration config)
        {
            Configuration = config;
        }

        public IConfiguration Configuration { get; }

        [HttpPost("token")]
        public ActionResult GetToken([FromForm] Account form)
        {

            
            if (form.UserName != null && form.UserName != null)
            {
                string username = form.UserName.ToString();
                string password = form.PassWord.ToString();
                AccountViewModel accountViewModel = AccountDAO.Instance.GetProfileByUsernameAndPassword(username, password);
                if (accountViewModel != null)
                {
                    // security key
                    string securityKey = Configuration["JWT:SecretKey"];

                    // symmetric security key
                    var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

                    // signing credentials
                    var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

                    //add claims
                    var claims = new List<Claim>();
                    claims.Add(new Claim(ClaimTypes.Role, accountViewModel.Role));
                    claims.Add(new Claim("ID", accountViewModel.ID.ToString()));
                    claims.Add(new Claim("Username", accountViewModel.UserName.ToString()));

                    // create token
                    var token = new JwtSecurityToken(
                        issuer: Configuration["JWT:Issuser"],
                        audience: Configuration["JWT:Audience"],
                        expires: DateTime.Now.AddHours(1),
                        signingCredentials: signingCredentials,
                        claims: claims
                    );
                    Dictionary<string, object> res = new Dictionary<string, object>();
                    res.Add("code", "LOGIN_SUCCESSFULY");
                    res.Add("account", accountViewModel);
                    res.Add("token", new JwtSecurityTokenHandler().WriteToken(token));
                    return Ok(res);
                }
            }
            Dictionary<string, string> response = new Dictionary<string, string>();
            response.Add("code", "LOGIN_FAILED");
            return Ok(response);
        }

        [HttpPost("register")]
        public ActionResult Register([FromForm] AccountViewModel data)
        {

            Dictionary<string, object> response = new Dictionary<string, object>();
            int result = AccountDAO.Instance.AddAccount(data);
            if (result > 0)
            {
                response.Add("code", "SUCCESSFULY");
                return Ok(response);
            }
            response.Add("code", "FAILED");
            return Ok(response);
        }



    }

}
