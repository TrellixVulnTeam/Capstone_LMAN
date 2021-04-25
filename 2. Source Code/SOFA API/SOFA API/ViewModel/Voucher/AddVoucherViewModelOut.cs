using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Voucher
{
    public class AddVoucherViewModelOut : BaseModelOut
    {
        public DTO.Voucher Voucher { get; set; }

        public AddVoucherViewModelOut()
        {
            Voucher = new DTO.Voucher();
        }

        public AddVoucherViewModelOut(DTO.Voucher voucher)
        {
            Voucher = voucher;
        }
    }
}
