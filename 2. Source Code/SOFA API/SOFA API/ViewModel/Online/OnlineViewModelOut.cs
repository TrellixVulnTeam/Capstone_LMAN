using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Online
{
    public class OnlineViewModelOut:BaseModelOut
    {
        public List<int> ListActiveAccount { get; set; }
        public bool IsActive { get; set; }

        public OnlineViewModelOut()
        {
            ListActiveAccount = new List<int>();
        }

        public OnlineViewModelOut(List<int> listActiveAccount, bool isActive)
        {
            ListActiveAccount = listActiveAccount;
            IsActive = isActive;
        }
    }
}
