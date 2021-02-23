using SOFA_API.DTO;
using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.View_newsfeed
{
    public class PostViewModelOut: BaseModelOut
    {
        public List<PostViewModelIn> ListPost { get; set; }

        public PostViewModelOut() : base() { }

        public PostViewModelOut(List<PostViewModelIn> listPost)
        {
            this.ListPost = listPost;
        }

        public PostViewModelOut(DataRow row) : base()
        {
            
        }
    }
}
