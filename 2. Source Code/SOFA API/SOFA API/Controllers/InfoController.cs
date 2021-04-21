using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Info;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InfoController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetAllInfo()
        {
            InfoViewModelOut infoViewModelOut = InfoService.Instance.GetAllInfo();
            return Ok(infoViewModelOut);
        }
        [HttpGet("UserInfo")]
        public ActionResult GetUserInfo()
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            InfoViewModelOut infoViewModelOut = InfoService.Instance.GetUserInfo(userID);
            return Ok(infoViewModelOut);
        }
        [HttpPost]
        public ActionResult CreateInfo([FromForm] InfoViewModelIn infoViewModelIn)
        {
            int myID = Utils.Instance.GetUserID(User.Claims);
            infoViewModelIn.AccountID = myID;
            InfoViewModelOut infoViewModelOut = InfoService.Instance.CreateInfo(infoViewModelIn);
            return Ok(infoViewModelOut);
        }
        [HttpGet("Delete")]
        public ActionResult Delete(int infoID)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            InfoViewModelOut infoViewModelOut = InfoService.Instance.Delete(infoID, userID);
            return Ok(infoViewModelOut);
        }
    }
}
