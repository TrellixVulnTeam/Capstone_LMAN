using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using SOFA_API.ViewModel.Message;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        [HttpGet("getmessagebycid")]
        public ActionResult GetMessageInConversation(int cid)
        {
            ListMessageViewModelOut listMess = MessageService.Instance.GetMessageByConversationId(cid);
            return Ok(listMess);
        }

        [HttpGet("getmessagebyuid")]
        public ActionResult GetMessageByDirectTwoId(int uid1, int uid2)
        {
            ListMessageViewModelOut listMess = MessageService.Instance.GetMessageBySenderAndReceiverId(uid1, uid2);
            return Ok(listMess);
        }

        [HttpPost("sendmessage")]
        public ActionResult UpdateProfile([FromForm] MessageViewModelIn newMessage)
        {
            DateTime myDateTime = DateTime.Now;
            string sqlFormattedDate = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");
            string imageUrl = "message/" + newMessage.ConversationId + "/" + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss-fff") + ".png";
            newMessage.ImageUrl = imageUrl;
            newMessage.Time = sqlFormattedDate;
            MessageViewModelOut message = MessageService.Instance.InsertNewMessage(newMessage);
            return Ok(message);
        }
    }
}
