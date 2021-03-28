using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
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
        public ActionResult GetNotificationByUserID(int accountID)
        {
            ListNotificationViewModelOut listNoti = NotificationService.Instance.GetNotificationByToAccount(accountID);

            return Ok(listNoti);
        }

        [HttpGet("getnoti")]
        public async Task<ActionResult> GetNotiAsync()
        {
            await notificationHub.Clients.All.SendAsync("NewNotification", "OK");
            return Ok();
        }
    }
}
