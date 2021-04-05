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
    }
}
