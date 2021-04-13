using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using SOFA_API.ViewModel.Support;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportController : ControllerBase
    {
        [HttpPost("createsupportrequest")]
        [Authorize]
        public ActionResult CreateRequest([FromForm] SupportRequestViewModelIn requestIn)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            requestIn.UserRequestId = Int32.Parse(idClaim.Value.Trim());
            DateTime myDateTime = DateTime.Now;
            requestIn.TimeCreate = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");
            requestIn.Status = 2;
            requestIn.Respone = "";
            SupportRequestViewModelOut newRequest = SupportService.Instance.CreateSupportRequest(requestIn);
            return Ok(newRequest);
        }

        [HttpGet("getsupportrequest")]
        [Authorize]
        public ActionResult GetRequest(int supportType)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int userId = Int32.Parse(idClaim.Value.Trim());
            SupportRequestViewModelOut newRequest = SupportService.Instance.GetSupportRequest(userId, supportType);
            return Ok(newRequest);
        }
    }
}
