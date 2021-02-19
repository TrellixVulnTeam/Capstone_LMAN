using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatAPI.DAO;
using ChatAPI.DTO;
using ChatAPI.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetAccount()
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            Dictionary<string, object> response = AccountService.Instance.GetAccount(id);
            return Ok(response);
        }

        [HttpGet("OtherProfile")]
        public ActionResult OtherProfile(int id)
        {
            Dictionary<string, object> response = AccountService.Instance.GetOtherAccount(id);
            return Ok(response);
        }
        [HttpGet("Friend")]
        public ActionResult GetFriends()
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            Dictionary<string, object> response = AccountService.Instance.GetAllFriend(id);
            return Ok(response);
        }
    }
}
