using SOFA_API.DTO;
using SOFA_API.ViewModel.BaseModel;
using SOFA_API.ViewModel.Newsfeed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.PostViewModel
{
    public class AdminPostDetailModelOut : BaseModelOut
    {
        public int Id { get; set; }
        public int AccountPost { get; set; }
        public string PostedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public string Content { get; set; }
        public List<Image> ListImage { get; set; }
        public int TotalLike { get; set; }
        public double RateAverage { get; set; }
        public List<CommentModelOut> ListComment { get; set; }

        public AdminPostDetailModelOut(): base()
        {
        }
    }
}
