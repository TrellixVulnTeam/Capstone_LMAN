using SOFA_API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Newsfeed
{
    public class PostModelOut
    {
        public int ID { get; set; }
        public string Content { get; set; }
        public int PrivacyID { get; set; }
        public DateTime Time { get; set; }
        public int AccountPost { get; set; }
        public List<Image> ListImage { get; set; }
        public List<Like> ListLike { get; set; }
        public List<Comment> ListComment { get; set; }
        public List<Rate> ListRate { get; set; }
        public int NumberOfLike { get; set; }
        public int NumberOfComment { get; set; }
        public int RateAverage { get; set; }
        public PostModelOut()
        {
        }

        public PostModelOut(int iD, string content, int privacyID, DateTime time, int accountPost, List<Image> listImage, List<Like> listLike, List<Comment> listComment, List<Rate> listRate, int numberOfLike, int numberOfComment, int rateAverage)
        {
            ID = iD;
            Content = content;
            PrivacyID = privacyID;
            Time = time;
            AccountPost = accountPost;
            ListImage = listImage;
            ListLike = listLike;
            ListComment = listComment;
            ListRate = listRate;
            NumberOfLike = numberOfLike;
            NumberOfComment = numberOfComment;
            RateAverage = rateAverage;
        }

        public void SetPostDetail(Post post)
        {
            ID = post.ID;
            Content = post.Content;
            PrivacyID = post.PrivacyID;
            Time = post.Time;
            AccountPost = post.AccountPost;
        }
    }
}
