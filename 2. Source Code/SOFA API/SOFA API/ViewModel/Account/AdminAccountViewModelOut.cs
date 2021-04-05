using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Account
{
    public class AdminAccountViewModelOut: BaseModelOut
    {
        public List<AdminAccountModelOut> ListUser { get; set; }

        public AdminAccountViewModelOut() : base()
        {
            ListUser = new List<AdminAccountModelOut>();
        }

        public AdminAccountViewModelOut(List<AdminAccountModelOut> listUser) : base()
        {
            ListUser = listUser;
        }
    }
}
