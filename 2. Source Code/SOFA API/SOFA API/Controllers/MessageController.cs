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
        [HttpGet("getmessage")]
        public ActionResult GetMessageInConversation(int cid)
        {
            ListMessageViewModelOut listMess = MessageService.Instance.GetMessageByConversationId(cid);
            return Ok(listMess);
        }
    }
}
