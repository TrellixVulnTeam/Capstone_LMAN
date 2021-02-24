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
        [HttpPost("addVoucher")]
        public ActionResult addVoucher(AddVoucherViewModelIn viewModelIn)
        {
            AddVoucherViewModelOut modelOut = VoucherService.Instance.addVoucher(viewModelIn);
            return Ok(modelOut);
        }
    }
}
