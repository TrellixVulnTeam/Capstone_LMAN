using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SOFA_API.ViewModel.BaseModel;


namespace SOFA_API.ViewModel.Voucher
{
    public class UpdateVoucherViewModelOut:BaseModelOut
    {
        public DTO.Voucher Voucher { get; set; }

        public UpdateVoucherViewModelOut()
        {
            Voucher = new DTO.Voucher();
        }

        public UpdateVoucherViewModelOut(DTO.Voucher voucher)
        {
            Voucher = voucher;
        }
    }
}
