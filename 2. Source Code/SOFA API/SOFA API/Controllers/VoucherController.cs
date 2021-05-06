using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SOFA_API.Common;
using SOFA_API.Hubs;
using SOFA_API.Service;
using SOFA_API.ViewModel.Notification;
using SOFA_API.ViewModel.Voucher;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {

        protected readonly IHubContext<NotificationHub> notificationHub;
        public VoucherController([NotNull] IHubContext<NotificationHub> notificationHub)
        {
            this.notificationHub = notificationHub;
        }
        /// <summary>
        /// Add Voucher by admin
        /// </summary>
        /// <param name="viewModelIn">
        /// This param require fields: Title, Image, code, Description, Content, Fromdate, ToDate, Quantity
        /// if Quantity unlimited , Quantity =-1
        ///   eg: { "Title": "title 1", "Image": "aqbcd","code" :"ABCD", "Description":"Description","Content": "Content","Fromdate":"2019-07-26T00:00:00", "ToDate": "2019-07-26T00:00:00", "Quantity": -1}
        /// </param>
        /// <returns></returns>
        [HttpPost("addVoucher")]
        public ActionResult AddVoucher([FromForm] AddVoucherViewModelIn viewModelIn)
        {
            AddVoucherViewModelOut modelOut = VoucherService.Instance.AddVoucher(viewModelIn);
            return Ok(modelOut);
        }
        /// <summary>
        /// Get List Voucher of once account by IsExpiress, IsUsed
        /// </summary>
        /// <param name="viewModelIn">
        /// This param require fields: AccountId , IsExpiress , IsUsed
        /// </param>
        /// <returns></returns>
        [HttpPost("getVoucherByAccount")]
        public ActionResult GetVoucherByAccount([FromForm] VoucherViewModelIn viewModelIn)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            ListVoucherViewModelOut listVoucher = VoucherService.Instance.GetListVoucherByAccountID(id, viewModelIn);
            return Ok(listVoucher);
        }
        /// <summary>
        ///Get Detail Voucher for User
        /// </summary>
        /// <param name="viewModelIn">
        /// This param require fields: ID, AccountId
        /// </param>
        /// <returns></returns>
        [HttpPost("getVoucherDetailByAccount")]
        public ActionResult GetVoucherDetailByAccount([FromForm]  VoucherDetaiForUserViewModelIn viewModelIn)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            VoucherDetaiForUserViewModelOut viewModelOut = VoucherService.Instance.GetVoucherDetailByAccountId(id, viewModelIn);
            return Ok(viewModelOut);
        }
        [HttpPost("useVoucher")]
        public ActionResult UseVoucher([FromForm] AddVoucherViewModelIn viewModelIn)
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            AddVoucherViewModelOut modelOut = VoucherService.Instance.UseVoucher(id,viewModelIn);
            return Ok(modelOut);
        }

        [HttpGet("getAllVoucher")]
        public ActionResult GetAllVoucher()
        {
            AdminVoucherViewModelOut modelOut = VoucherService.Instance.GetAllVoucher();
            return Ok(modelOut);
        }

        [HttpPost("DeleteVoucher")]
        public ActionResult GetAllVoucher([FromForm] int voucherId)
        {
            AdminVoucherViewModelOut modelOut = VoucherService.Instance.DeleteVoucher(voucherId);

            return Ok(modelOut);
        }
        [HttpPost("GiveVoucher")]
        public ActionResult GiveVoucher([FromForm] int voucherId, [FromForm] int accountId)
        {
            AdminVoucherViewModelOut modelOut = VoucherService.Instance.GiveVoucher(voucherId, accountId);
            if (modelOut.Code == Const.REQUEST_CODE_SUCCESSFULLY)
            {
                //notification
                NotificationViewModelIn modelIn = new NotificationViewModelIn(Const.NOTIFICATION_TYPE_ADD_VOUCHER,
                    Const.NOTIFICATION_CONTENT_ADD_VOUCHER + modelOut.ListVoucher[0].Title, 1, accountId);
                NotificationViewModelOut notiModelOut = NotificationService.Instance.CreatedNotificationForSupportRequest(modelIn);
                notificationHub.Clients.User(accountId.ToString()).SendAsync("NewNotification", notiModelOut);
            }
            return Ok(modelOut);
        }
    }
}
