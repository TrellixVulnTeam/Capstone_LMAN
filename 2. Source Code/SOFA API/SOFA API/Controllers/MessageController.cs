using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SOFA_API.Common;
using SOFA_API.Hubs;
using SOFA_API.Service;
using SOFA_API.ViewModel.Message;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessageController : ControllerBase
    {

        protected readonly IHubContext<MessageHub> messageHub;
        public MessageController([NotNull] IHubContext<MessageHub> messageHub)
        {
            this.messageHub = messageHub;
        }

        [HttpGet("getmessagebycid")]
        public ActionResult GetMessageInConversation(int cid)
        {
            ListMessageViewModelOut listMess = MessageService.Instance.GetMessageByConversationId(cid);
            return Ok(listMess);
        }

        [HttpGet("getmessagebyuid")]
        public ActionResult GetMessageByDirectTwoId(int uid2, int page, int rowsOfPage)
        {
            int uid1 = Utils.Instance.GetUserID(User.Claims);
            ListMessageViewModelOut listMess = MessageService.Instance.GetMessageBySenderAndReceiverId(uid1, uid2, page, rowsOfPage);
            return Ok(listMess);
        }

        [HttpPost("sendmessage")]
        public async Task<ActionResult> CreateNewMessage([FromForm] MessageViewModelIn newMessage)
        {
            int fromAccountID = Utils.Instance.GetUserID(User.Claims);
            newMessage.FromAccountId = fromAccountID;
            DateTime myDateTime = DateTime.Now;
            string sqlFormattedDate = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");
            string imageUrl = "message/" + newMessage.ConversationId + "/" + myDateTime.ToString("yyyy-MM-dd-HH-mm-ss-fff") + ".png";
            newMessage.ImageUrl = imageUrl;
            newMessage.Time = sqlFormattedDate;
            MessageViewModelOut message = MessageService.Instance.InsertNewMessage(newMessage);
            message.FromAccountId = newMessage.FromAccountId;
            await messageHub.Clients.User(message.ToAccountId.ToString()).SendAsync("NewMessage", message);
            return Ok(message);
        }

        [HttpPost("deletemessage")]
        public ActionResult DeleteMessage(int messageId, bool isSenderDelete)
        {
            int userID = Utils.Instance.GetUserID(User.Claims);
            MessageViewModelOut message = MessageService.Instance.SetDeleteFlagForMessage(userID, messageId, isSenderDelete);
            return Ok(message);
        }
    }
}
