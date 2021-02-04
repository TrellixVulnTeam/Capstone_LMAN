using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TestJWT.Hubs;

namespace TestJWT.Controllers
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
        public async Task<ActionResult> Create(MessagePost messagePost)
        {
            await messageHub.Clients.All.SendAsync("sendToReact", messagePost);
            return Ok(messagePost);
        }
    }
    public class MessagePost
    {
        public virtual string Message { get; set; }
        public virtual string User { get; set; }
    }
}
