using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SOFA_API.Common;
using SOFA_API.Hubs;
using SOFA_API.Service;
using SOFA_API.ViewModel.Notification;
using SOFA_API.ViewModel.Support;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportController : ControllerBase
    {

        protected readonly IHubContext<NotificationHub> notificationHub;
        public SupportController([NotNull] IHubContext<NotificationHub> notificationHub)
        {
            this.notificationHub = notificationHub;
        }

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

        [HttpGet("checkfashionista")]
        [Authorize]
        public ActionResult CheckFashionista()
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int userId = Int32.Parse(idClaim.Value.Trim());
            SupportRequestViewModelOut newRequest = SupportService.Instance.CheckFashionista(userId);
            return Ok(newRequest);
        }

        [HttpGet("getdetailusersupport")]
        public ActionResult GetDetailUserSupport(int supportType)
        {
            DetailUserSupportModelOut modelOut = SupportService.Instance.GetAllUserSupportRequest();
            return Ok(modelOut);
        }

        [HttpPost("setuserfashionista")]
        public ActionResult SetUserFashionista([FromForm] int requestId, [FromForm] int userId)
        {
            DetailUserSupportModelOut modelOut = SupportService.Instance.SetUserFashionistaRequest(requestId, userId);
            if (modelOut.Code == Const.REQUEST_CODE_SUCCESSFULLY)
            {
                //notification
                NotificationViewModelIn modelIn = new NotificationViewModelIn(Const.NOTIFICATION_TYPE_APPROVE_SUPPORT,
                    Const.NOTIFICATION_CONTENT_APPROVE_FASHIONISTA_SUPPORT, 1, userId);
                NotificationViewModelOut notiModelOut = NotificationService.Instance.CreatedNotificationForSupportRequest(modelIn);
                notificationHub.Clients.User(notiModelOut.ToAccount.ToString()).SendAsync("NewNotification", modelOut);
            }
            return Ok(modelOut);
        }

        [HttpPost("setuserlockaccount")]
        public ActionResult SetUserLockAccount([FromForm] int requestId, [FromForm] int userId)
        {
            DetailUserSupportModelOut modelOut = SupportService.Instance.SetUserLockAccountRequest(requestId, userId);
            return Ok(modelOut);
        }

        [HttpPost("rejectsupportrequest")]
        public ActionResult RejectSupportRequest([FromForm] int requestId,[FromForm] int requestType, [FromForm] int userId)
        {
            DetailUserSupportModelOut modelOut = SupportService.Instance.RejectSupportRequest(requestId);
            if (modelOut.Code == Const.REQUEST_CODE_SUCCESSFULLY)
            {
                NotificationViewModelIn modelIn = new NotificationViewModelIn();
                if (requestType == Const.SUPPORT_TYPE_FASHIONISTA)
                {
                    modelIn = new NotificationViewModelIn(Const.NOTIFICATION_TYPE_REJECT_SUPPORT,
                    Const.NOTIFICATION_CONTENT_REJECT_FASHIONISTA_SUPPORT, 1, userId);
                }
                if (requestType == Const.SUPPORT_TYPE_LOCKACCOUNT)
                {
                    modelIn = new NotificationViewModelIn(Const.NOTIFICATION_TYPE_REJECT_SUPPORT,
                    Const.NOTIFICATION_CONTENT_REJECT_LOCKACCOUNT_SUPPORT, 1, userId);
                }
                NotificationViewModelOut notiModelOut = NotificationService.Instance.CreatedNotificationForSupportRequest(modelIn);
                notificationHub.Clients.User(notiModelOut.ToAccount.ToString()).SendAsync("NewNotification", modelOut);
            }
            return Ok(modelOut);
        }
    }
}
