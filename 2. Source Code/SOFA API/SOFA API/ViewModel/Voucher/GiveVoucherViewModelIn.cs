using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SOFA_API.ViewModel.BaseModel;

namespace SOFA_API.ViewModel.Voucher
{
    public class GiveVoucherViewModelIn : BaseModelIn
    {
        public int VoucherID { get; set; }
        public int UserID { get; set; }

        public GiveVoucherViewModelIn()
        {
        }

        public GiveVoucherViewModelIn(int voucherID, int userID, int adminID)
        {
            VoucherID = voucherID;
            UserID = userID;
        }
    }
}
