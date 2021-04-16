using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.MarkupPost;
using SOFA_API.ViewModel.Newsfeed;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkupController : ControllerBase
    {
        [HttpGet("MarkupPost")]
        [Authorize]
        public ActionResult MarkupPost(int postID)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            MarkupViewModelOut markupViewModelOut = MarkupService.Instance.AddMarkedPost(postID, userID);
            return Ok(markupViewModelOut);
        }
        [HttpGet("UnmarkupPost")]
        [Authorize]
        public ActionResult UnmarkupPost(int postID)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            MarkupViewModelOut markupViewModelOut = MarkupService.Instance.UnmarkedPost(postID, userID);
            return Ok(markupViewModelOut);
        }
        [HttpGet("GetUserMarkupPost")]
        [Authorize]
        public ActionResult GetUserMarkupPost(int page, int rowsOfPage)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            PostViewModelOut markupViewModelOut = MarkupService.Instance.GetUserMarkupPost(userID, page, rowsOfPage);
            return Ok(markupViewModelOut);
        }
        [HttpGet("GetAllMarkupPost")]
        public ActionResult GetAllMarkupPost(int page, int rowsOfPage)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            PostViewModelOut markupViewModelOut = MarkupService.Instance.GetAllMarkupPost(userID, page, rowsOfPage);
            return Ok(markupViewModelOut);
        }
    }
}
