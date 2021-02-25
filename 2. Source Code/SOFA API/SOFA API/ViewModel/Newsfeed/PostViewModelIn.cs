using SOFA_API.DTO;
using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Newsfeed
{
    public class PostViewModelIn : BaseModelIn
    {
        public int PostID { get; set; }
        public string Content { get; set; }
        public int PrivacyID { get; set; }
        public DateTime Time { get; set; }
        public List<ImageModelIn> ListImage { get; set; }
        public int AccountPost { get; set; }
        public int RatePoint { get; set; }
        public string Comment { get; set; }


        public PostViewModelIn() : base() { }

        public PostViewModelIn(int id, string content, int privacyID, DateTime time, int accountPost, int ratePoint, string comment)
        {
            PostID = id;
            Content = content;
            PrivacyID = privacyID;
            Time = time;
            AccountPost = accountPost;
            RatePoint = ratePoint;
            Comment = comment;
        }

    }
}
