using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Voucher
{
    public class VoucherDetaiForUserViewModelIn : BaseModelIn
    {
        public int ID { get; set; }
        public int AccountId { get; set; }

        public VoucherDetaiForUserViewModelIn()
        {
        }

        public VoucherDetaiForUserViewModelIn(int iD, int accountId)
        {
            ID = iD;
            AccountId = accountId;
        }
    }
}
