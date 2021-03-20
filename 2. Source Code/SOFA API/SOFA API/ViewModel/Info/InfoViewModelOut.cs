using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Info
{
    public class InfoViewModelOut : BaseModelOut
    {
        public List<InfoModelOut> ListInfo { get; set; }
        public InfoViewModelOut() : base()
        {
            ListInfo = new List<InfoModelOut>();
        }

        public InfoViewModelOut(List<InfoModelOut> listInfo) : base()
        {
            ListInfo = listInfo;
        }
    }
}
