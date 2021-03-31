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
        public int BodyInfoID { get; set; }
        public int AccountPost { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }
        public bool Gender { get; set; }
        public List<Image> ListImage { get; set; }
        public List<LikeModelOut> ListLike { get; set; }
        public List<CommentModelOut> ListComment { get; set; }
        public List<Rate> ListRate { get; set; }
        public int NumberOfLike { get; set; }
        public int NumberOfComment { get; set; }
        public double RateAverage { get; set; }
        public bool IsLiked { get; set; }
        public int MyRatePoint { get; set; }
        public bool IsVerified { get; set; }
        public bool IsMarked { get; set; }
        public PostModelOut()
        {
            ListImage = new List<Image>();
            ListLike = new List<LikeModelOut>();
            ListComment = new List<CommentModelOut>();
            ListRate = new List<Rate>();
            BodyInfoID = 0;
            NumberOfLike = 0;
            NumberOfComment = 0;
            RateAverage = 0;
            IsLiked = false;
            MyRatePoint = 0;
            IsMarked = false;
            IsVerified = false;
        }

        public PostModelOut(int iD, string content, int privacyID, DateTime time, int bodyInfoID, int accountPost, string firstName, string lastName, string avatar, bool gender, List<Image> listImage, List<LikeModelOut> listLike, List<CommentModelOut> listComment, List<Rate> listRate, int numberOfLike, int numberOfComment, double rateAverage, bool isLiked, int myRatePoint, bool isVerified, bool isMarked)
        {
            ID = iD;
            Content = content;
            PrivacyID = privacyID;
            Time = time;
            BodyInfoID = bodyInfoID;
            AccountPost = accountPost;
            FirstName = firstName;
            LastName = lastName;
            Avatar = avatar;
            Gender = gender;
            ListImage = listImage;
            ListLike = listLike;
            ListComment = listComment;
            ListRate = listRate;
            NumberOfLike = numberOfLike;
            NumberOfComment = numberOfComment;
            RateAverage = rateAverage;
            IsLiked = isLiked;
            MyRatePoint = myRatePoint;
            IsVerified = isVerified;
            IsMarked
        }

        public void SetPostDetail(Post post)
        {
            ID = post.ID;
            Content = post.Content;
            PrivacyID = post.PrivacyID;
            Time = post.Time;
            AccountPost = post.AccountPost;
            BodyInfoID = post.BodyInfoID;
            IsVerified = post.IsVerified;
        }
        public void SetAccountPost(DTO.Profile profile)
        {
            FirstName = profile.FirstName;
            LastName = profile.LastName;
            Gender = profile.Gender;
            Avatar = profile.AvatarUri;
        }
    }
}
