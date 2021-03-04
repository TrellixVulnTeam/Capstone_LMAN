using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.DAO;
using SOFA_API.Service;
using SOFA_API.ViewModel.Balance;
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
       /// <summary>
       /// Get Balance By Id
       /// </summary>
       /// <returns></returns>
        [HttpGet]
        public ActionResult GetBalance()
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            GetBalanceViewModelOut modelOut = BalanceService.Instance.GetBalanceByAccountID(id);
            return Ok(modelOut);
        }
        /// <summary>
        /// Get TransactionHistory By Account ID
        /// </summary>
        /// <param name="modelIn">
        /// This param require fields: AccountID
        /// </param>
        /// <returns></returns>
        [HttpGet("history")]
        public ActionResult GetTransactionHistory()
        {
            
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            ListTransactionViewModelOut viewModelOut = BalanceService.Instance.GetTransactionHistory(id);
            return Ok(viewModelOut);
        }
        /// <summary>
        /// TopUp Account by admin
        /// </summary>
        /// <param name="topUp">
        /// This param require fields: AccountId , AdminId , Amount , Description
        /// </param>
        /// <returns></returns>
        [HttpPost("topUpAccount")]
        public ActionResult TopUpAccount(TopUpAccountModelIn topUp)
        {
            TopUpAccountModelOut topUpAccountModelOut = BalanceService.Instance.topUpAccount(topUp);
            return Ok(topUpAccountModelOut);
        }
    }
}
