using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Profile
{
    public class ProfileModelOut
    {
        public int AccountID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Gender { get; set; }
        public DateTime DOB { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string AvatarUri { get; set; }
        public string Avatar { get; set; }
        public int FollowerNumber { get; set; }
        public int PostNumber { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public bool IsFollowed { get; set; }
        public ProfileModelOut()
        {

        }
        public ProfileModelOut(int accountID, string firstName, string lastName, bool gender, DateTime dOB, string email, string phone, string address, string avatarUri, string avatar, int followerNumber, int postNumber, string username, string role, bool isFollowed)
        {
            this.AccountID = accountID;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Gender = gender;
            this.DOB = dOB;
            this.Email = email;
            this.Phone = phone;
            this.Address = address;
            this.AvatarUri = avatarUri;
            this.Avatar = avatar;
            this.FollowerNumber = followerNumber;
            this.PostNumber = postNumber;
            this.UserName = username;
            this.Role = role;
            this.IsFollowed = isFollowed;
        }

        public ProfileModelOut(DataRow row) : base()
        {
            this.AccountID = (int)row["AccountId"];
            this.FirstName = row["FirstName"].ToString();
            this.LastName = row["LastName"].ToString();
            this.Gender = Convert.IsDBNull(row["Gender"]) ? true : (bool)row["Gender"];
            this.DOB = Convert.IsDBNull(row["DOB"]) ? new DateTime(1999, 01, 01) : (DateTime)row["DOB"];
            this.Email = row["Email"].ToString();
            this.Phone = row["Phone"].ToString();
            this.Address = row["Address"].ToString();
            this.AvatarUri = row["Avatar"].ToString();
            this.Avatar = "";
            this.FollowerNumber = 0;
            this.PostNumber = 0;
            this.UserName = row["UserName"].ToString();
            this.Role = null;
        }
    }
}
