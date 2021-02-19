using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ChatAPI.Common;
using ChatAPI.DAO;
using ChatAPI.DTO;
using ChatAPI.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        protected readonly IHubContext<MessageHub> messageHub;
        public MessageController([NotNull] IHubContext<MessageHub> messageHub)
        {
            this.messageHub = messageHub;
        }



        [HttpPost]
        public async Task<ActionResult> Create(Message message)
        {
            Dictionary<string, object> res = new Dictionary<string, object>();
            int result = MessageDAO.Instance.AddMessage(message);
            if (result != 0)
            {
                message.ID = result;
                if (message.Image != null && message.Image.Length > 0)
                {
                    var bytes = Convert.FromBase64String(message.Image);
                    using (var imageFile = new FileStream(@"C:\inetpub\wwwroot\assets\Image\Message\" + message.ID + ".png", FileMode.Create))
                    {
                        imageFile.Write(bytes, 0, bytes.Length);
                        imageFile.Flush();
                    }
                    message.Image = "/assets/Image/Message/" + message.ID + ".png";
                    MessageDAO.Instance.UpdateImageMessage(message.ID, message);
                }

                await messageHub.Clients.User(message.ReceiverID.ToString()).SendAsync("NewMessage", message);
                res.Add("code", "SUCCESSFULLY");
                res.Add("message", message);
            }
            else
            {
                res.Add("code", "FAILED");
            }
            return Ok(res);
        }

        [HttpGet]
        [Authorize]
        public ActionResult GetMessageWith(int id)
        {
            Dictionary<string, object> res = new Dictionary<string, object>();
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int myID = Int32.Parse(idClaim.Value.Trim());
            List<Message> messages = MessageDAO.Instance.GetAllMessageOfUser(myID, id);
            res.Add("code", "SUCCESSFULLY");
            res.Add("messages", messages);
            return Ok(res);
        }

    }
}
