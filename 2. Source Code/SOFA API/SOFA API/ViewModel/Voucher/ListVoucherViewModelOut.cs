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

        public List<VoucherViewModelOut> voucherViewModelOuts { get; set; }

        public ListVoucherViewModelOut() : base()
        {
        }

        public ListVoucherViewModelOut(List<VoucherViewModelOut> voucherViewModelOuts)
        {
            this.voucherViewModelOuts = voucherViewModelOuts;
        }
        public ListVoucherViewModelOut(DataRow row) : base()
        {

        }
    }
}
