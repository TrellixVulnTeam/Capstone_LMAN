using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using SOFA_API.ViewModel.View_newsfeed;

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
    }
}
