using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using SOFA_API.ViewModel.Account;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("GetAllUser")]
        public ActionResult GetAllUser(int page, int rowsOfPage)
        {
            AdminAccountViewModelOut listAllPost = UserService.Instance.GetAllUser();
            return Ok(listAllPost);
        }

        [HttpGet("GetUserDetailByID")]
        public ActionResult GetUserDetailByID(int id)
        {
            AdminUserDetailViewModelOut user = UserService.Instance.GetUserDetailById(id);
            return Ok(user);
        }

        [HttpPost("BanUser")]
        public ActionResult BanUser([FromForm] int accountId)
        {
            AccountViewModelOut user = UserService.Instance.BanUser(accountId);
            return Ok(user);
        }

        [HttpPost("UnbanUser")]
        public ActionResult UnbanUser([FromForm] int accountId)
        {
            AccountViewModelOut user = UserService.Instance.UnbanUser(accountId);
            return Ok(user);
        }

        [HttpGet("GetDashboard")]
        public ActionResult GetDashboard()
        {
            AdminDashboardModelOut dashboard = UserService.Instance.GetDashBoardInformation();
            return Ok(dashboard);
        }
    }
}
