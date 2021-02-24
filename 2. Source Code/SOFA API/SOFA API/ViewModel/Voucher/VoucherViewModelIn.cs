using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Voucher
{
    public class VoucherViewModelIn : BaseModelIn
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public bool IsExpiress { get; set; }
        public bool IsUsed { get; set; }

        public VoucherViewModelIn() : base()
        {
        }

        public VoucherViewModelIn(int iD, int accountID, bool isExpiress, bool isUsed)
        {
            ID = iD;
            AccountID = accountID;
            IsExpiress = isExpiress;
            IsUsed = isUsed;
        }
    }
}
