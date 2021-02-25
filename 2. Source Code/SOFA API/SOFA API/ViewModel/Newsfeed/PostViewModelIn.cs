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
        public int ID { get; set; }
        public string Content { get; set; }
        public int PrivacyID { get; set; }
        public DateTime Time { get; set; }
        public int AccountPost { get; set; }
        public string Comment { get; set; }
        public int RatePoint { get; set; }
        public int NumberOfLike { get; set; }
        public int NumberOfComment { get; set; }
        public int NumberOfRate { get; set; }
        public List<ImageModelIn> ListImage { get; set; }

        public PostViewModelIn() : base() { }

        public PostViewModelIn(int iD, string content, int privacyID, DateTime time, int accountPost, string comment, int ratePoint, int numberOfLike, int numberOfComment, int numberOfRate, List<ImageModelIn> listImage)
        {
            ID = iD;
            Content = content;
            PrivacyID = privacyID;
            Time = time;
            AccountPost = accountPost;
            Comment = comment;
            RatePoint = ratePoint;
            NumberOfLike = numberOfLike;
            NumberOfComment = numberOfComment;
            NumberOfRate = numberOfRate;
            ListImage = listImage;
        }
    }
}
