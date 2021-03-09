using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using SOFA_API.ViewModel.Voucher;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
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

        public ActionResult AddVoucher(AddVoucherViewModelIn viewModelIn)
        {
            AddVoucherViewModelOut modelOut = VoucherService.Instance.AddVoucher(viewModelIn);
            return Ok(modelOut);
        }
        /// <summary>
        /// Get List Voucher of once account by IsExpiress, IsUsed
        /// </summary>
        /// <param name="viewModelIn">
        /// This param require fields: AccountId , IsExpiress , IsUsed
        /// eg: { "AccountID": 9,  "IsExpiress": true, "IsUsed": false}
        /// </param>
        /// <returns></returns>
        [HttpPost("getVoucherByAccount")]
        public ActionResult GetVoucherByAccount([FromForm]  VoucherViewModelIn viewModelIn) {
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
        ///eg: { "ID":11,  "AccountId":9 }
        /// </param>
        /// <returns></returns>
        [HttpGet("getVoucherDetailByAccount")]
        public ActionResult GetVoucherDetailByAccount(VoucherDetaiForUserViewModelIn viewModelIn)
        {
            VoucherDetaiForUserViewModelOut viewModelOut = VoucherService.Instance.GetVoucherDetailByAccountId(viewModelIn);
            return Ok(viewModelOut);
        }
    }
}
