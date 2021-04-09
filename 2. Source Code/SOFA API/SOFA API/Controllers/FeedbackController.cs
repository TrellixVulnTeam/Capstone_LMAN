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
        public ActionResult SendFeedback([FromForm] FeedbackViewModelIn feedback)
        {
            //var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            //feedback.UserFeedbackId = Int32.Parse(idClaim.Value.Trim());
            feedback.UserFeedbackId = 13;
            DateTime myDateTime = DateTime.Now;
            feedback.LastUpdated = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");
            FeedbackViewModelOut newFeedback = FeedbackService.Instance.CreateNewFeedback(feedback);
            return Ok(newFeedback);
        }
    }
}
