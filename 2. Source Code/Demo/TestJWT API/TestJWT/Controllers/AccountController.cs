using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestJWT.DAO;
using TestJWT.ViewModel;

namespace TestJWT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetMyProfile()
        {
            Dictionary<string, object> response = new Dictionary<string, object>();

            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            if (idClaim != null)
            {
                response.Add("code", "SUCCESSFULY");
                int id = int.Parse(idClaim.Value.Trim());
                AccountViewModel accountViewModel = AccountDAO.Instance.GetAccountByID(id);
                response.Add("account", accountViewModel);
                return Ok(response);
            }

            response.Add("code", "FAILED");
            return Ok(response);
        }
    }
}
