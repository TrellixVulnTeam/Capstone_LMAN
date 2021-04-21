using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SOFA_API.Common;
using SOFA_API.Hubs;
using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnlineController : ControllerBase
    {

        protected readonly IHubContext<MessageHub> messageHub;
        public OnlineController([NotNull] IHubContext<MessageHub> messageHub)
        {
            this.messageHub = messageHub;
        }
        [HttpGet("Online")]
        public async Task<ActionResult> Online()
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            Session.addUserActive(userID);
            await messageHub.Clients.All.SendAsync("ChangeStatus", Session.ListUserActive);
            BaseModelOut baseModelOut = new BaseModelOut();
            baseModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            return Ok(baseModelOut);
        }
        [HttpGet("Offline")]
        public async Task<ActionResult> Offline()
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            Session.removeUserActive(userID);
            await messageHub.Clients.All.SendAsync("ChangeStatus", Session.ListUserActive);
            BaseModelOut baseModelOut = new BaseModelOut();
            baseModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            return Ok(baseModelOut);
        }
    }
}
