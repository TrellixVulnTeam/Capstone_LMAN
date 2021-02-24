using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Balance
{
    public class GetBalanceViewModelIn : BaseModelIn
    {
        public int AccountId { get; set; }

        public GetBalanceViewModelIn()
        {
        }

        public GetBalanceViewModelIn(int accountId)
        {
            AccountId = accountId;
        }
        public GetBalanceViewModelIn(DataRow row)
        {

        }
    }
}
