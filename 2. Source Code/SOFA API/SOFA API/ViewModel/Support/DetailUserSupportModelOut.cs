using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Support
{
    public class DetailUserSupportModelOut : BaseModelOut
    {
        public List<DetailUserSupportModel> ListUserSupport { get; set; }

        public DetailUserSupportModelOut() : base()
        {
            ListUserSupport = new List<DetailUserSupportModel>();
        }
        public DetailUserSupportModelOut(List<DetailUserSupportModel> listUserSupport) : base()
        {
            ListUserSupport = listUserSupport;
        }
    }
}
