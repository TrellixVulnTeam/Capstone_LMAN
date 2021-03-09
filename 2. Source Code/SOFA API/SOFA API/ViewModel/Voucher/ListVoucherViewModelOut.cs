using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Voucher
{
    public class ListVoucherViewModelOut : BaseModelOut
    {

        public List<VoucherViewModelOut> listVoucher { get; set; }

        public ListVoucherViewModelOut() : base()
        {
        }

        public ListVoucherViewModelOut(List<VoucherViewModelOut> listVoucher)
        {
            this.listVoucher = listVoucher;
        }
    }
}
