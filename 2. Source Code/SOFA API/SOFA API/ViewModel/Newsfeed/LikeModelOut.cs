using SOFA_API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Newsfeed
{
    public class LikeModelOut
    {
        public int ID { get; set; }
        public int PostID { get; set; }
        public int AccountLike { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }
        public bool Gender { get; set; }

        public LikeModelOut()
        {
        }

        public LikeModelOut(int iD, int postID, int accountLike, string firstName, string lastName, string avatar, bool gender)
        {
            ID = iD;
            PostID = postID;
            AccountLike = accountLike;
            FirstName = firstName;
            LastName = lastName;
            Avatar = avatar;
            Gender = gender;
        }
        public void SetLikeInfo(Like like)
        {
            ID = like.ID;
            PostID = like.PostID;
            AccountLike = like.AccountLike;
        }
        public void SetAccountLike(DTO.Profile profile)
        {
            FirstName = profile.FirstName;
            LastName = profile.LastName;
            Gender = profile.Gender;
            Avatar = profile.AvatarUri;
        }
    }
}
