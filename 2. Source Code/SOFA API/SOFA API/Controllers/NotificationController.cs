using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SOFA_API.Common;
using SOFA_API.Hubs;
using SOFA_API.Service;
using SOFA_API.ViewModel.Notification;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        protected readonly IHubContext<NotificationHub> notificationHub;

        public NotificationController([NotNull] IHubContext<NotificationHub> notificationHub)
        {
            this.notificationHub = notificationHub;
        }

        [HttpGet("getnotibyid")]
        public ActionResult GetNotificationByUserID(int page, int rowsOfPage)
        {
            int id = Utils.Instance.GetUserID(User.Claims);
            ListNotificationViewModelOut listNoti = NotificationService.Instance.GetNotificationByToAccount(id, page, rowsOfPage);
            return Ok(listNoti);
        }

        [HttpGet("getUnreadNotification")]
        [Authorize]
        public ActionResult GetUnreadNotification(int page, int rowsOfPage)
        {
            int id = Utils.Instance.GetUserID(User.Claims);
            ListNotificationViewModelOut listUnreadNotification = NotificationService.Instance.GetUnreadNotificationByToAccount(id, page, rowsOfPage);
            return Ok(listUnreadNotification);
        }

        [HttpPost("setreadnotibyid")]
        public ActionResult SetReadNotificationById(int ID)
        {
            NotificationViewModelOut noti = NotificationService.Instance.SetReadNotificationById(ID);
            return Ok(noti);
        }

    }
}
