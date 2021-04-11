using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Balance
{
    public class AdminUserbalanceViewModelOut : BaseModelOut
    {
        public decimal TotalBalance { get; set; }
        public List<AdminUserbalanceModel> ListBalance { get; set; }

        public AdminUserbalanceViewModelOut() : base()
        {
            ListBalance = new List<AdminUserbalanceModel>();
        }

        public AdminUserbalanceViewModelOut(List<AdminUserbalanceModel> listBalance) : base()
        {
            ListBalance = listBalance;
        }
    }
}
