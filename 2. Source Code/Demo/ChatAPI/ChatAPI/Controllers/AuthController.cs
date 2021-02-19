using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChatAPI.DTO;
using ChatAPI.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            string securityKey = Configuration["JWT:SecretKey"];
            string issuer = Configuration["JWT:Issuser"];
            string audience = Configuration["JWT:Audience"];
            Dictionary<string, object> response = AuthService.Instance.GetToken(form.UserName, form.PassWord, securityKey, issuer, audience);
            return Ok(response);
        }
    }
}
