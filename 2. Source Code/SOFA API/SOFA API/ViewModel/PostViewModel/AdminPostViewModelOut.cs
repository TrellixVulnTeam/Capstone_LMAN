using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.PostViewModel
{
    public class AdminPostViewModelOut : BaseModelOut
    {
        public List<AdminPostModelOut> ListPost { get; set; }

        public AdminPostViewModelOut() : base()
        {
            ListPost = new List<AdminPostModelOut>();
        }

        public AdminPostViewModelOut(List<AdminPostModelOut> listPost) : base()
        {
            ListPost = listPost;
        }
    }
}
