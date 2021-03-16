using SOFA_API.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Newsfeed
{
    public class CommentModelOut
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }
        public bool Gender { get; set; }
        public int PostID { get; set; }
        public string Content { get; set; }
        public DateTime Time { get; set; }
        public CommentModelOut() { }

        public CommentModelOut(int accountID, int postID, string content, DateTime time)
        {
            this.AccountID = accountID;
            this.PostID = postID;
            this.Content = content;
            this.Time = time;
        }

        public CommentModelOut(DataRow row)
        {
            this.ID = (int)row["Id"];
            this.AccountID = (int)row["AccountId"];
            this.PostID = (int)row["PostId"];
            this.Content = row["content"].ToString();
            this.Time = (DateTime)row["time"];
        }
        public void SetComment(Comment comment)
        {
            this.ID = comment.ID;
            this.AccountID = comment.AccountID;
            this.PostID = comment.PostID;
            this.Content = comment.Content;
            this.Time = comment.Time;
        }
        public void SetAccountComment(DTO.Profile profile)
        {
            FirstName = profile.FirstName;
            LastName = profile.LastName;
            Gender = profile.Gender;
            Avatar = profile.AvatarUri;
        }

    }
}
