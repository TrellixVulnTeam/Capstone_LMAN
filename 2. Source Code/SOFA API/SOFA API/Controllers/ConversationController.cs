using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using SOFA_API.ViewModel.Conversation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using SOFA_API.Common;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationController : ControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        public ActionResult GetListConversation()
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int accountId = Int32.Parse(idClaim.Value.Trim());
            ListConversationViewModelOut modelOut = ConversationService.Instance.getListConversation(accountId);
            return Ok(modelOut);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="modelIn"></param>
        /// <returns></returns>
        [HttpPost("searchConversation")]
        [Authorize]
        public ActionResult SearchConversation([FromForm] SearchCoversationViewModelIn modelIn)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int accountId = Int32.Parse(idClaim.Value.Trim());
            ListSearchConversationViewModelOut modelOut = ConversationService.Instance.SearchConversation(accountId, modelIn.searchValue);
            return Ok(modelOut);
        }
        [HttpPost("deleteConversation")]
        [Authorize]
        public ActionResult DeleteMessage([FromForm] ConversationViewModelIn modelIn)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            ConversationViewModelOut conversation = ConversationService.Instance.DeleteConversation(id,  Int32.Parse(modelIn.AccountId.ToString()));
            return Ok(conversation);
        }
        [HttpGet("getAllUserSearch")]
        [Authorize]
        public ActionResult GetAllUser()
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int accountId = Int32.Parse(idClaim.Value.Trim());
            ListSearchConversationViewModelOut modelOut = ConversationService.Instance.GetAllUserSearch(accountId);
            return Ok(modelOut);
        }
        [HttpGet("GetNumberUnreadMessage")]
        public ActionResult GetNumberUnreadMessage()
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            ListConversationViewModelOut messageViewModelOut = ConversationService.Instance.GetNumberUnreadMessage(userID);
            return Ok(messageViewModelOut);
        }
        [HttpGet("MarkConversationIsReaded")]
        [Authorize]
        public ActionResult MarkConversationIsReaded(int fromAccount)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            ListConversationViewModelOut messageViewModelOut = ConversationService.Instance.MarkConversationIsReaded(fromAccount, userID);
            return Ok(messageViewModelOut);
        }
        [HttpGet("MarkMessageIsReaded")]
        [Authorize]
        public ActionResult MarkMessageIsReaded(int messageID)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            ListConversationViewModelOut messageViewModelOut = ConversationService.Instance.MarkMessageIsReaded(messageID, userID);
            return Ok(messageViewModelOut);
        }
    }
}
