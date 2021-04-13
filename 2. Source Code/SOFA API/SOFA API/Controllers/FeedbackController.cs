using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SOFA_API.Common;
using SOFA_API.Hubs;
using SOFA_API.Service;
using SOFA_API.ViewModel.Feedback;
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
    public class FeedbackController : ControllerBase
    {
        protected readonly IHubContext<NotificationHub> notificationHub;
        public FeedbackController([NotNull] IHubContext<NotificationHub> notificationHub)
        {
            this.notificationHub = notificationHub;
        }

        [HttpPost("createfeedback")]
        [Authorize]
        public ActionResult SendFeedback([FromForm] FeedbackViewModelIn feedback)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            feedback.UserFeedbackId = Int32.Parse(idClaim.Value.Trim());
            DateTime myDateTime = DateTime.Now;
            feedback.LastUpdated = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");
            FeedbackViewModelOut newFeedback = FeedbackService.Instance.CreateNewFeedback(feedback);
            return Ok(newFeedback);
        }

        [HttpGet("getlistfeedback")]
        [Authorize]
        public ActionResult GetListFeedback()
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int userId = Int32.Parse(idClaim.Value.Trim());
            ListFeedbackViewModelOut newFeedback = FeedbackService.Instance.GetListFeedback(userId);
            return Ok(newFeedback);
        }

        [HttpGet("getfeedbackdetail")]
        [Authorize]
        public ActionResult GetFeedbackById(int fid) {
            FeedbackViewModelOut feedback = FeedbackService.Instance.GetFeedbackById(fid);
            return Ok(feedback);
        }

        [HttpGet("getAllFeedback")]
        public ActionResult GetAllFeedback()
        {
            AdminFeedbackViewModelOut feedback = FeedbackService.Instance.GetAllFeedback();
            return Ok(feedback);
        }

        [HttpPost("adminProcessFeedback")]
        public ActionResult AdminProcessFeedback([FromForm] FeedbackViewModelIn feedback)
        {
            FeedbackViewModelOut modelOut = FeedbackService.Instance.ProcessFeedback(feedback.Id);

            if (modelOut.Code == Const.REQUEST_CODE_SUCCESSFULLY)
            {
                NotificationViewModelOut notificationModelOut = NotificationService.Instance.AddNewNotificationFeedback(feedback.Id, 
                    feedback.UserFeedbackId);
                notificationHub.Clients.User(notificationModelOut.ToAccount.ToString()).SendAsync("NewNotification", notificationModelOut);
            }

            return Ok(modelOut);
        }

    }
}
