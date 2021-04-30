using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.Hubs;
using SOFA_API.Service;
using SOFA_API.ViewModel.Balance;
using SOFA_API.ViewModel.Notification;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using ZaloPay.Helper.Crypto;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BalanceController : ControllerBase
    {

        protected readonly IHubContext<NotificationHub> notificationHub;
        public BalanceController([NotNull] IHubContext<NotificationHub> notificationHub)
        {
            this.notificationHub = notificationHub;
        }
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
        public ActionResult TopUpAccount([FromForm] TopUpAccountModelIn topUp)
        {
            topUp.Description = "Topup by admin";
            TopUpAccountModelOut topUpAccountModelOut = BalanceService.Instance.topUpAccount(topUp);
            if (topUpAccountModelOut.Code == Const.REQUEST_CODE_SUCCESSFULLY)
            {
                //notification
                NotificationViewModelIn modelIn = new NotificationViewModelIn(Const.NOTIFICATION_TYPE_TOPUP_ACCOUNT,
                    Const.NOTIFICATION_CONTENT_TOPUP_ACCOUNT + topUp.Amount + "vnđ", 1, topUp.AccountId);
                NotificationViewModelOut notiModelOut = NotificationService.Instance.CreatedNotificationForSupportRequest(modelIn);
                notificationHub.Clients.User(topUp.AccountId.ToString()).SendAsync("NewNotification", notiModelOut);
            }
            return Ok(topUpAccountModelOut);
        }

        [HttpGet("GetUserBalanceById")]
        public ActionResult GetUserBalanceById(int id)
        {
            AdminUserbalanceViewModelOut modelOut = BalanceService.Instance.GetUserBalanceByAccountId(id);
            return Ok(modelOut);
        }

        [HttpPost("ZPTopup")]
        public ActionResult TopupZalaPay([FromBody] ZaloPayTopupModelIn cbdata)
        {

            ZaloPayResultModel zaloPayResultModel = BalanceService.Instance.TopupZaloPay(cbdata);
            return Ok(zaloPayResultModel);
            
        }
    }
}
