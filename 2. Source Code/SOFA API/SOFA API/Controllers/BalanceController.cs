using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BalanceController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetBalance(int accountId)
        {
            Dictionary<string, object> response = BalanceService.Instance.GetBalanceByAccountID(accountId);
            return Ok(response);
        }
        [HttpGet("history")]
        public ActionResult GetTransactionHistory(int accountID)
        {
            Dictionary<string, object> response = BalanceService.Instance.GetTransactionHistory(accountID);
            return Ok(response);
        }
    }
}
