using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using SOFA_API.ViewModel.View_newsfeed;
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


        [HttpPost("likePost")]
        [Authorize]
        public ActionResult likePost(int postID)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            PostViewModelOut result = PostService.Instance.likePost(postID, id);
            return Ok(result);
        }

        [HttpPost("ratePost")]
        [Authorize]
        public ActionResult ratePost(int postID, int ratePoint)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            PostViewModelOut result = PostService.Instance.ratePost(postID, id, ratePoint);
            return Ok(result);
        }

        [HttpPost("commentPost")]
        [Authorize]
        public ActionResult commentPost(int postID, string content)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            PostViewModelOut result = PostService.Instance.commentPost(id, postID, content);
            return Ok(result);
        }

    }
}
