using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SOFA_API.Common;
using SOFA_API.Hubs;
using SOFA_API.Service;
using SOFA_API.ViewModel.Follow;
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
    public class FollowController : ControllerBase
    {

        protected readonly IHubContext<NotificationHub> notificationHub;
        public FollowController([NotNull] IHubContext<NotificationHub> notificationHub)
        {
            this.notificationHub = notificationHub;
        }

        [HttpGet("getfollowernumber")]
        public ActionResult GetFollowerNumber(int userId)
        {
            FollowOfAPersonModelOut follow = FollowService.Instance.GetFollowerNumber(userId);
            return Ok(follow);
        }

        [HttpGet("getfollowerlist")]
        public ActionResult GetFollowerList(int userId)
        {
            FollowOfAPersonModelOut follow = FollowService.Instance.GetFollowerList(userId);
            return Ok(follow);
        }

        [HttpPost("followsomeone")]
        [Authorize]
        public ActionResult FollowSomeone(int userGetFollowId)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            FollowViewModelOut follow = FollowService.Instance.FollowSomeone(userID, userGetFollowId);

            if (follow.Code.Equals(Const.REQUEST_CODE_SUCCESSFULLY) && userID != userGetFollowId)
            {
                //notification
                NotificationViewModelIn modelIn = new NotificationViewModelIn(userID, userGetFollowId);
                NotificationViewModelOut modelOut = NotificationService.Instance.CreatedNotificationFollow(modelIn);
                notificationHub.Clients.User(modelOut.ToAccount.ToString()).SendAsync("NewNotification", modelOut);
            }

            return Ok(follow);
        }

        [HttpPost("unfollowsomeone")]
        [Authorize]
        public ActionResult UnfollowSomeone(int userGetFollowId)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            FollowViewModelOut unfollow = FollowService.Instance.UnfollowSomeone(userID, userGetFollowId);
            return Ok(unfollow);
        }

        [HttpGet("checkfollowed")]
        [Authorize]
        public ActionResult CheckFollowed(int userGetFollowId)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            FollowViewModelOut follow = FollowService.Instance.CheckFollowed(userID, userGetFollowId);
            return Ok(follow);
        }
    }
}
