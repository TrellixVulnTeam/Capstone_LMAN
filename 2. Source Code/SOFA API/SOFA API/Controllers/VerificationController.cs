using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Verificatiton;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerificationController : ControllerBase
    {
        [HttpGet("Register")]
        public ActionResult Register([FromForm] VerificationModelIn verificationModelIn)
        {
            VerificationModelOut verificationModelOut = VerificationService.Instance.GetOTPCode(verificationModelIn);
            return Ok(verificationModelOut);
        } 
        [HttpPost("Verify")]
        public ActionResult VerifyCode([FromForm] VerificationModelIn verificationModelIn)
        {
            VerificationModelOut verificationModelOut = VerificationService.Instance.VerifyCode(verificationModelIn);
            return Ok(verificationModelOut);
        }
    }
}
