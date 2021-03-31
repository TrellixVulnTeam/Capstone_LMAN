using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public ActionResult FollowSomeone(int followerId, int userGetFollowId)
        {
            FollowViewModelOut follow = FollowService.Instance.FollowSomeone(followerId, userGetFollowId);
            return Ok(follow);
        }

        [HttpPost("unfollowsomeone")]
        public ActionResult UnfollowSomeone(int followerId, int userGetFollowId)
        {
            FollowViewModelOut unfollow = FollowService.Instance.UnfollowSomeone(followerId, userGetFollowId);
            return Ok(unfollow);
        }

        [HttpGet("checkfollowed")]
        public ActionResult CheckFollowed(int followerId, int userGetFollowId)
        {
            FollowViewModelOut follow = FollowService.Instance.CheckFollowed(followerId, userGetFollowId);
            return Ok(follow);
        }
    }
}
