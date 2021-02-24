using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Balance
{
    public class GetBalanceViewModelOut: BaseModelOut
    {
        public decimal Balance { get; set; }
        public GetBalanceViewModelOut()
        {
        }

        public GetBalanceViewModelOut(decimal balance) 
        {
            Balance = balance;
        }
        public GetBalanceViewModelOut(DataRow row)
        {
            Balance = (decimal)row["Balance"];
        }
    }
}
