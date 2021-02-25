using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Newsfeed
{
    public class PostViewModelOut:BaseModelOut
    {
        public List<PostModelOut> ListPost { get; set; }

        public PostViewModelOut():base()
        {
            ListPost = new List<PostModelOut>();
        }

        public PostViewModelOut(List<PostModelOut> listPost):base()
        {
            ListPost = listPost;
        }
    }
}
