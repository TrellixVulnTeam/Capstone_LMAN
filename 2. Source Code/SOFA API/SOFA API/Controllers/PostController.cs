using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using SOFA_API.ViewModel.Newsfeed;
using System;
using System.Linq;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        [HttpPost]
        public ActionResult GetAllPost()
        {
            PostViewModelOut listAllPost = PostService.Instance.getAllPost();
            return Ok(listAllPost);
        }


        [HttpPost("LikePost")]
        [Authorize]
        public ActionResult LikePost(int postID)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            PostViewModelOut result = PostService.Instance.LikePost(postID, id);
            return Ok(result);
        }

        [HttpPost("RatePost")]
        [Authorize]
        public ActionResult RatePost(int postID, int ratePoint)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            PostViewModelOut result = PostService.Instance.RatePost(postID, id, ratePoint);
            return Ok(result);
        }

        [HttpPost("CommentPost")]
        [Authorize]
        public ActionResult CommentPost(int postID, string content)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            PostViewModelOut result = PostService.Instance.CommentPost(id, postID, content);
            return Ok(result);
        }

        [HttpPost("CreatePost")]
        [Authorize]
        public ActionResult CreatePost([FromForm] PostViewModelIn postViewModelIn)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            postViewModelIn.AccountPost = id;
            PostViewModelOut postViewModelOut = PostService.Instance.CreateNewPost(postViewModelIn);
            return Ok(postViewModelOut);
        }
    }
}
