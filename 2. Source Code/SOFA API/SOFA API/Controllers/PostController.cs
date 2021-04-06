using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SOFA_API.Common;
using SOFA_API.Hubs;
using SOFA_API.Service;
using SOFA_API.ViewModel.Newsfeed;
using SOFA_API.ViewModel.Notification;
using SOFA_API.ViewModel.PostViewModel;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        protected readonly IHubContext<NotificationHub> notificationHub;

        public PostController([NotNull] IHubContext<NotificationHub> notificationHub)
        {
            this.notificationHub = notificationHub;
        }

        [HttpGet]
        public ActionResult GetAllPost(int page, int rowsOfPage)
        {
            int myID = Utils.Instance.GetUserID(User.Claims);
            PostViewModelOut listAllPost = PostService.Instance.GetAllPost(myID, page, rowsOfPage);
            return Ok(listAllPost);
        }

        [HttpGet("GetUserPublicPost")]
        public ActionResult GetUserPublicPost(int accountPost, int page, int rowsOfPage)
        {
            int myID = Utils.Instance.GetUserID(User.Claims);
            PostViewModelIn postViewModelIn = new PostViewModelIn();
            postViewModelIn.AccountPost = accountPost;
            PostViewModelOut postViewModelOut = PostService.Instance.GetAllPublicPostOfUser(postViewModelIn, myID, page, rowsOfPage);
            return Ok(postViewModelOut);
        }

        [HttpGet("GetUserPost")]
        [Authorize]
        public ActionResult GetUserPost(int page, int rowsOfPage)
        {
            int accountPost = Utils.Instance.GetUserID(User.Claims);
            PostViewModelIn postViewModelIn = new PostViewModelIn();
            postViewModelIn.AccountPost = accountPost;
            PostViewModelOut postViewModelOut = PostService.Instance.GetAllPostOfUser(postViewModelIn, accountPost, page, rowsOfPage);
            return Ok(postViewModelOut);
        }

        [HttpPost("LikePost")]
        [Authorize]
        public ActionResult LikePost([FromForm] PostViewModelIn postViewModelIn)
        {
            int id = Utils.Instance.GetUserID(User.Claims);
            PostViewModelOut result = PostService.Instance.LikePost(postViewModelIn.PostID, id);
            if (result.Code.Equals(Const.REQUEST_CODE_SUCCESSFULLY))
            {
                //notification
                NotificationViewModelIn modelIn = new NotificationViewModelIn(Const.NOTIFICATION_TYPE_LIKE,
                    postViewModelIn.PostID, id);
                NotificationViewModelOut modelOut = NotificationService.Instance.CreatedNotification(modelIn);
                if (modelOut.FromAccount != modelIn.ToAccount)
                {
                    notificationHub.Clients.User(modelOut.ToAccount.ToString()).SendAsync("NewNotification", modelOut);
                }
            }
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
            if (result.Code.Equals(Const.REQUEST_CODE_SUCCESSFULLY))
            {
                //notification
                NotificationViewModelIn modelIn = new NotificationViewModelIn(Const.NOTIFICATION_TYPE_RATE,
                postViewModelIn.PostID, id);
                NotificationViewModelOut modelOut = NotificationService.Instance.CreatedNotification(modelIn);
                if (modelOut.FromAccount != modelIn.ToAccount)
                {
                    notificationHub.Clients.User(modelOut.ToAccount.ToString()).SendAsync("NewNotification", modelOut);
                }
            }
            return Ok(result);
        }

        [HttpPost("CommentPost")]
        [Authorize]
        public ActionResult CommentPost([FromForm] PostViewModelIn postViewModelIn)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            PostViewModelOut result = PostService.Instance.CommentPost(id, postViewModelIn.PostID, postViewModelIn.Comment);
            if (result.Code.Equals(Const.REQUEST_CODE_SUCCESSFULLY))
            {
                //notification
                NotificationViewModelIn modelIn = new NotificationViewModelIn(Const.NOTIFICATION_TYPE_COMMENT,
                postViewModelIn.PostID, id);
                NotificationViewModelOut modelOut = NotificationService.Instance.CreatedNotification(modelIn);
                if (modelOut.FromAccount != modelIn.ToAccount)
                {
                    notificationHub.Clients.User(modelOut.ToAccount.ToString()).SendAsync("NewNotification", modelOut);
                }
            }
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
            PostService.Instance.setHub(notificationHub);
            PostViewModelOut postViewModelOut = PostService.Instance.CreateNewPost(postViewModelIn);
            return Ok(postViewModelOut);
        }
        [HttpGet("GetPostDetail")]
        public ActionResult GetPostDetail(int postID, int commentRowsOfPage)
        {
            int id = Utils.Instance.GetUserID(User.Claims);
            PostViewModelIn postViewModelIn = new PostViewModelIn();
            postViewModelIn.PostID = postID;
            PostViewModelOut postViewModelOut = PostService.Instance.GetPostDetail(postViewModelIn, id, commentRowsOfPage);
            return Ok(postViewModelOut);
        }
        [HttpGet("GetCommentOfPost")]
        public ActionResult GetListCommentOfPost(int postID, int page, int rowsOfPage)
        {
            PostViewModelIn postViewModelIn = new PostViewModelIn();
            postViewModelIn.PostID = postID;
            PostViewModelOut postViewModelOut = PostService.Instance.GetListCommentOfPost(postViewModelIn, page, rowsOfPage);
            return Ok(postViewModelOut);
        }
        [HttpPost("DeletePost")]
        [Authorize]
        public ActionResult DeletePost([FromForm] PostViewModelIn postViewModelIn)
        {
            int id = Utils.Instance.GetUserID(User.Claims);
            PostViewModelOut postViewModelOut = PostService.Instance.DeletePostByID(postViewModelIn.PostID, id);
            return Ok(postViewModelOut);
        }
        [HttpGet("Recommend")]
        [Authorize]
        public ActionResult GetPostRecommend(int infoID, int page, int rowsOfPage)
        {
            int id = Utils.Instance.GetUserID(User.Claims);
            PostViewModelOut postViewModelOut = PostService.Instance.GetListPostRecommend(id, infoID, page, rowsOfPage);
            return Ok(postViewModelOut);
        }

        [HttpGet("Verify")]
        public ActionResult Verify(int postID)
        {
            object obj = PostService.Instance.Verify(postID);
            return Ok(obj);
        }
        [HttpGet("Search")]
        public ActionResult Search(string url)
        {
            object obj = new ClarifaiUtils().SearchImageTemp(url);
            return Ok(obj);
        }
        [HttpGet("AddImage")]
        public ActionResult AddImage(string url, string name)
        {
            object obj = new ClarifaiUtils().AddImage(url, name);
            return Ok(obj);
        }
        [HttpPost("UpdatePostContent")]
        public ActionResult UpdatePostContent([FromForm] PostViewModelIn postViewModelIn)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);

            PostViewModelOut postViewModelOut = PostService.Instance.UpdatePostContent(userID, postViewModelIn.PostID, postViewModelIn.Content, postViewModelIn.PrivacyID);

            return Ok(postViewModelOut);
        }

        [HttpGet("GetAllPostWithoutPaging")]
        public ActionResult GetAllPostWithoutPaging()
        {
            AdminPostViewModelOut listAllPost = PostService.Instance.GetAllPostWithoutPaging();
            return Ok(listAllPost);
        }
    }
}
