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

        /// <summary>
        /// This controller process register new user that using SOFA application
        /// </summary>
        /// <param name="accountViewModelIn">
        /// This param require fields: username, password, email, phone, firtname, lastname, isApplicationAccess, transactionId and code
        /// </param>
        /// <returns></returns>
        [HttpPost("register")]
        public ActionResult Register([FromForm] AccountViewModelIn data)
        {
            AccountViewModelOut loginViewModelOut = authService.AddNewAccount(data);
            return Ok(loginViewModelOut);
        }

        /// <summary>
        /// This controller process login into system - admin, user
        /// </summary>
        /// <param name="data">
        /// This param require fields: username, password
        /// </param>
        /// <returns></returns>
        [HttpPost("login")]
        public ActionResult Login([FromForm] AccountViewModelIn data)
        {
            AccountViewModelOut loginViewModelOut = authService.GetToken(data);
            return Ok(loginViewModelOut);
        }

        /// <summary>
        /// This controller process reset password for user, include reset password and change password
        /// </summary>
        /// <param name="data">
        /// This param require fields: if the resquest is resert password: phone, newPassword, transactionID and code
        /// if the request is change password: phone, password, newPassword
        /// </param>
        /// <returns></returns>
        [HttpPost("reset-password")]
        public ActionResult ResetPassword([FromForm] AccountViewModelIn data)
        {
            AccountViewModelOut loginViewModelOut = authService.ResetPassword(data);
            return Ok(loginViewModelOut);
        }

        /// <summary>
        /// This controller process login with social account
        /// </summary>
        /// <param name="data">
        /// This param require fields: username, email, phone, firtname, lastname
        /// </param>
        /// <returns></returns>
        [HttpPost("OAuth")]
        public ActionResult OAuth([FromForm] string tokenId)
        {
            AccountViewModelOut loginViewModelOut = authService.GoogleAuthentication(tokenId);
            return Ok(loginViewModelOut);
        }

        [HttpPost("addNewStaff")]
        public ActionResult AddNewStaff([FromForm] AccountViewModelIn data)
        {
            AccountViewModelOut loginViewModelOut = authService.AddNewStaff(data);
            return Ok(loginViewModelOut);
        }

        [HttpPost("admin-reset-password")]
        public ActionResult AdminResetPassword([FromForm] int accountId)
        {
            AccountViewModelOut loginViewModelOut = authService.AdminResetPassword(accountId);
            return Ok(loginViewModelOut);
        }

        [HttpPost("admin-change-password")]
        public ActionResult AdminChangePassword([FromForm] AccountViewModelIn data)
        {
            AccountViewModelOut loginViewModelOut = authService.AdminChangePassword(data);
            return Ok(loginViewModelOut);
        }
    }
}
