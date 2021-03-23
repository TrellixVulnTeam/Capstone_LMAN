using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using SOFA_API.ViewModel.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        [HttpGet("getnotificationbytoaccount")]
        public ActionResult GetNotificationByUserID(int accountID)
        {
            ListNotificationViewModelOut listNoti = NotificationService.Instance.GetNotificationByToAccount(accountID);
            return Ok(listNoti);
        }
    }
}
