using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        /// <summary>
        /// This controller process verification for register function
        /// It will send otp code to phone number that user send to server
        /// </summary>
        /// <param name="verificationModelIn">
        /// This param require fields: PhoneNumber, UserName
        /// </param>
        /// <returns></returns>
        [HttpPost("Register")]
        public ActionResult Register([FromForm] VerificationModelIn verificationModelIn)
        {
            verificationModelIn.Method = Const.VERIFICATION_METHOD_PHONE;
            verificationModelIn.TransactionType = Const.VERIFICATION_TRANSACTION_TYPE_REGISTER;
            VerificationModelOut verificationModelOut = VerificationService.Instance.GetOTPCode(verificationModelIn);
            return Ok(verificationModelOut);
        }
        /// <summary>
        /// This controller process verification for reset password function
        /// It will send otp code to phone number or email that dependent on Verification.Method
        /// </summary>
        /// <param name="verificationModelIn">
        /// This param require fields: Model, username if model = 1, email if model = 2, phone if model = 3
        /// </param>
        /// <returns></returns>
        [HttpPost("Reset")]
        public ActionResult ResetPassword([FromForm] VerificationModelIn verificationModelIn)
        {
            verificationModelIn.TransactionType = Const.VERIFICATION_TRANSACTION_TYPE_OTHER;
            VerificationModelOut verificationModelOut = VerificationService.Instance.GetOTPCode(verificationModelIn);
            return Ok(verificationModelOut);
        }
        /// <summary>
        /// This controller process verification for reset password function
        /// It will send otp code to email that save in profile table in database
        /// Authorization require (Auth bearer token in headers of request)
        /// </summary>
        /// <param name="verificationModelIn">
        /// Don't need anything, this controller will send otp by get email from profile through account id in claims
        /// </param>
        /// <returns></returns>
        [HttpPost]
        [Authorize]
        public ActionResult Verification([FromForm] VerificationModelIn verificationModelIn)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            verificationModelIn.Method = Const.VERIFICATION_METHOD_ACCOUNT_ID;
            verificationModelIn.TransactionType = Const.VERIFICATION_TRANSACTION_TYPE_OTHER;
            verificationModelIn.AccountID = id;
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
