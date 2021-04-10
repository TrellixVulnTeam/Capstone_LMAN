using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using SOFA_API.ViewModel.Feedback;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        [HttpPost("createfeedback")]
        [Authorize]
        public ActionResult SendFeedback([FromForm] FeedbackViewModelIn feedback)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            feedback.UserFeedbackId = Int32.Parse(idClaim.Value.Trim());
            DateTime myDateTime = DateTime.Now;
            feedback.LastUpdated = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");
            FeedbackViewModelOut newFeedback = FeedbackService.Instance.CreateNewFeedback(feedback);
            return Ok(newFeedback);
        }

        [HttpGet("getlistfeedback")]
        [Authorize]
        public ActionResult GetListFeedback()
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int userId = Int32.Parse(idClaim.Value.Trim());
            ListFeedbackViewModelOut newFeedback = FeedbackService.Instance.GetListFeedback(userId);
            return Ok(newFeedback);
        }
    }
}
