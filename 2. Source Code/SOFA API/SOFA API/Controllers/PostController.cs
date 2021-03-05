using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Common;
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
        [HttpGet]
        public ActionResult GetAllPost()
        {
            int myID = Utils.Instance.GetUserID(User.Claims);
            PostViewModelOut listAllPost = PostService.Instance.GetAllPost(myID);
            return Ok(listAllPost);
        }

        [HttpGet("GetUserPublicPost")]
        public ActionResult GetUserPublicPost([FromForm] PostViewModelIn postViewModelIn)
        {
            int myID = Utils.Instance.GetUserID(User.Claims);
            PostViewModelOut postViewModelOut = PostService.Instance.GetAllPublicPostOfUser(postViewModelIn, myID);
            return Ok(postViewModelOut);
        }

        [HttpGet("GetUserPost")]
        [Authorize]
        public ActionResult GetUserPost([FromForm] PostViewModelIn postViewModelIn)
        {
            int accountPost = Utils.Instance.GetUserID(User.Claims);
            postViewModelIn.AccountPost = accountPost;
            PostViewModelOut postViewModelOut = PostService.Instance.GetAllPostOfUser(postViewModelIn, accountPost);
            return Ok(postViewModelOut);
        }

        [HttpPost("LikePost")]
        [Authorize]
        public ActionResult LikePost([FromForm] PostViewModelIn postViewModelIn)
        {
            int id = Utils.Instance.GetUserID(User.Claims);
            PostViewModelOut result = PostService.Instance.LikePost(postViewModelIn.PostID, id);
            return Ok(result);
        }

        [HttpPost("UnLikePost")]
        [Authorize]
        public ActionResult UnLikePost([FromForm] PostViewModelIn postViewModelIn)
        {
            int id = Utils.Instance.GetUserID(User.Claims);
            PostViewModelOut result = PostService.Instance.UnLikePost(postViewModelIn.PostID, id);
            return Ok(result);
        }

        [HttpPost("RatePost")]
        [Authorize]
        public ActionResult RatePost([FromForm] PostViewModelIn postViewModelIn)
        {
            int id = Utils.Instance.GetUserID(User.Claims);
            PostViewModelOut result = PostService.Instance.RatePost(postViewModelIn.PostID, id, postViewModelIn.RatePoint);
            return Ok(result);
        }

        [HttpPost("CommentPost")]
        [Authorize]
        public ActionResult CommentPost([FromForm] PostViewModelIn postViewModelIn)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            PostViewModelOut result = PostService.Instance.CommentPost(id, postViewModelIn.PostID, postViewModelIn.Comment);
            return Ok(result);
        }
        /// <summary>
        /// Create new post
        /// </summary>
        /// <param name="postViewModelIn">
        /// Require fields: Content, PrivacyID, ListImage
        /// </param>
        /// <returns></returns>
        [HttpPost("CreatePost")]
        [Authorize]
        public ActionResult CreatePost([FromForm] PostViewModelIn postViewModelIn)
        {

            int id = Utils.Instance.GetUserID(User.Claims);
            postViewModelIn.AccountPost = id;
            PostViewModelOut postViewModelOut = PostService.Instance.CreateNewPost(postViewModelIn);
            return Ok(postViewModelOut);
        }
        [HttpGet("GetPostDetail")]
        public ActionResult GetPostDetail([FromForm] PostViewModelIn postViewModelIn)
        {
            int id = Utils.Instance.GetUserID(User.Claims);
            PostViewModelOut postViewModelOut = PostService.Instance.GetPostDetail(postViewModelIn);
            return Ok(postViewModelOut);
        }
        [HttpGet("GetCommentOfPost")]
        public ActionResult GetListCommentOfPost([FromForm] PostViewModelIn postViewModelIn)
        {
            PostViewModelOut postViewModelOut = PostService.Instance.GetListCommentOfPost(postViewModelIn);
            return Ok(postViewModelOut);
        }
    }
}
