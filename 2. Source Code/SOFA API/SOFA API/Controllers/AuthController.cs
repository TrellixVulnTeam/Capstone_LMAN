using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SOFA_API.Service;
using SOFA_API.ViewModel;
using SOFA_API.ViewModel.Account;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public AuthController(IConfiguration config)
        {
            authService = new AuthService(config);
        }

        public IConfiguration Configuration { get; }

        private AuthService authService;

        [HttpPost("register")]
        public ActionResult Register([FromForm] AccountViewModelIn data)
        {
            AccountViewModelOut loginViewModelOut = authService.AddNewAccount(data);
            return Ok(loginViewModelOut);
        }

        [HttpPost("login")]
        public ActionResult Login([FromForm] AccountViewModelIn data)
        {
            AccountViewModelOut loginViewModelOut = authService.GetToken(data);
            return Ok(loginViewModelOut);
        }

        [HttpPost("reset-password")]
        public ActionResult ResetPassword([FromForm] AccountViewModelIn data)
        {
            AccountViewModelOut loginViewModelOut = authService.ResetPassword(data);
            return Ok(loginViewModelOut);
        }

    }
}
