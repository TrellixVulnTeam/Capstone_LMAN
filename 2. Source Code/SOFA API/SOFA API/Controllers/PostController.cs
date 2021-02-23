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
        public ActionResult likePost(int postID)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            PostViewModelOut result = PostService.Instance.likePost(postID, id);
            return Ok(result);
        }

    }
}
