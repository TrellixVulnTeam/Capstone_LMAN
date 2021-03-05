﻿using SOFA_API.DTO;
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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }
        public bool Gender { get; set; }
        public List<Image> ListImage { get; set; }
        public List<Like> ListLike { get; set; }
        public List<CommentModelOut> ListComment { get; set; }
        public List<Rate> ListRate { get; set; }
        public int NumberOfLike { get; set; }
        public int NumberOfComment { get; set; }
        public int RateAverage { get; set; }
        public bool IsLiked { get; set; }
        public int MyRatePoint { get; set; }

        public PostModelOut()
        {
            ListImage = new List<Image>();
            ListLike = new List<Like>();
            ListComment = new List<CommentModelOut>();
            ListRate = new List<Rate>();
            NumberOfLike = 0;
            NumberOfComment = 0;
            RateAverage = 0;
            IsLiked = false;
            MyRatePoint = 0;
        }

        public PostModelOut(int iD, string content, int privacyID, DateTime time, int accountPost, string firstName, string lastName, string avatar, bool gender, List<Image> listImage, List<Like> listLike, List<CommentModelOut> listComment, List<Rate> listRate, int numberOfLike, int numberOfComment, int rateAverage, bool isLiked, int myRatePoint)
        {
            ID = iD;
            Content = content;
            PrivacyID = privacyID;
            Time = time;
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
        }

        public void SetPostDetail(Post post)
        {
            ID = post.ID;
            Content = post.Content;
            PrivacyID = post.PrivacyID;
            Time = post.Time;
            AccountPost = post.AccountPost;
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
