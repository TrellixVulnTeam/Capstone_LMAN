using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Voucher
{
    public class AdminVoucherViewModelOut : BaseModelOut
    {
        public List<AdminVoucherModelOut> ListVoucher { get; set; }

        public AdminVoucherViewModelOut() : base()
        {
            ListVoucher = new List<AdminVoucherModelOut>();
        }

        public AdminVoucherViewModelOut(List<AdminVoucherModelOut> listVoucher) : base()
        {
            ListVoucher = listVoucher;
        }
    }
}
