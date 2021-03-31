﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using SOFA_API.ViewModel.Conversation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetListConversation()
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int accountId = Int32.Parse(idClaim.Value.Trim());
            ListConversationViewModelOut modelOut = ConversationService.Instance.getListConversation(accountId);
            return Ok(modelOut);
        }
    }
}
