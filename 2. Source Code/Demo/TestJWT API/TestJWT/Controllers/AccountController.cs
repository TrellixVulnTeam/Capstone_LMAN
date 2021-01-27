using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
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
        [HttpPost]
        public ActionResult UploadAvatar([FromForm] AccountViewModel data)
        {
            Dictionary<string, object> response = new Dictionary<string, object>();


            var bytes = data.Avatar;
            using (var imageFile = new FileStream(@"C:\inetpub\wwwroot\assets\Image\"+data.UserName+@"\avatar.png", FileMode.Create))
            {
                imageFile.Write(bytes, 0, bytes.Length);
                imageFile.Flush();
            }
            response.Add("code", "SUCCESSFULY");
            response.Add("data", data.Avatar);


            return Ok(response);
        }
    }
}
