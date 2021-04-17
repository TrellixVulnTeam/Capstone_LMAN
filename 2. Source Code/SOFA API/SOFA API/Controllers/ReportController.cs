using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        [HttpGet("GetAllReport")]
        public ActionResult GetAllReport()
        {
            ReportViewModelOut reportViewModelOut = ReportService.Instance.GetAllReport();
            return Ok(reportViewModelOut);
        }
        [HttpGet("GetAllReason")]
        public ActionResult GetAllReason()
        {
            ReportViewModelOut reportViewModelOut = ReportService.Instance.GetAllReason();
            return Ok(reportViewModelOut);
        }
        [HttpGet("GetAllReportFromAccount")]
        public ActionResult GetAllReportFromAccount(int accountnID)
        {
            ReportViewModelOut reportViewModelOut = ReportService.Instance.GetAllReportFromAccount(accountnID);
            return Ok(reportViewModelOut);
        }
        [HttpGet("GetAllReportToAccount")]
        public ActionResult GetAllReportToAccount(int accountID)
        {
            ReportViewModelOut reportViewModelOut = ReportService.Instance.GetAllReportToAccount(accountID);
            return Ok(reportViewModelOut);
        }
        [HttpGet("GetAllReportToPost")]
        public ActionResult GetAllReportToPost(int postID)
        {
            ReportViewModelOut reportViewModelOut = ReportService.Instance.GetAllReportToPost(postID);
            return Ok(reportViewModelOut);
        }
        [HttpGet("GetAllReportToComment")]
        public ActionResult GetAllReportToComment(int commentID)
        {
            ReportViewModelOut reportViewModelOut = ReportService.Instance.GetAllReportToComment(commentID);
            return Ok(reportViewModelOut);
        }
        [HttpGet("GetAllReportPost")]
        public ActionResult GetAllReportPost()
        {
            ReportViewModelOut reportViewModelOut = ReportService.Instance.GetAllReportPost();
            return Ok(reportViewModelOut);
        }
        [HttpGet("GetAllReportUser")]
        public ActionResult GetAllReportUser()
        {
            ReportViewModelOut reportViewModelOut = ReportService.Instance.GetAllReportUser();
            return Ok(reportViewModelOut);
        }
        [HttpGet("GetAllReportComment")]
        public ActionResult GetAllReportComment()
        {
            ReportViewModelOut reportViewModelOut = ReportService.Instance.GetAllReportComment();
            return Ok(reportViewModelOut);
        }
        [HttpPost("CreateReport")]
        public ActionResult CreateReport([FromForm] ReportViewModelIn reportViewModelIn)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            reportViewModelIn.FromAccount = userID;
            ReportViewModelOut reportViewModelOut = ReportService.Instance.CreateReport(reportViewModelIn);
            return Ok(reportViewModelOut);
        }
        [HttpGet("AdminGetAllReport")]
        public ActionResult AdminGetAllReport()
        {
            ReportViewModelOut reportViewModelOut = ReportService.Instance.AdminGetAllReport();
            return Ok(reportViewModelOut);
        }
    }
}
