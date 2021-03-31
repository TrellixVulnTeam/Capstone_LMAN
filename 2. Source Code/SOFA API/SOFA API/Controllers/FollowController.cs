using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Follow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowController : ControllerBase
    {
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
