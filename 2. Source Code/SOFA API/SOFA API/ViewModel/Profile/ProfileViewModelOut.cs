using SOFA_API.DTO;
using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Profile
{
    public class ProfileViewModelOut : BaseModelOut
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
        public List<Post> ListPost { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public ProfileViewModelOut():base()
        {

        }
        public ProfileViewModelOut(int accountID, string firstName, string lastName, bool gender, DateTime dOB, string email, string phone, string address, string avatarUri, string avatar, int followerNumber, List<Post> listPost, string username, string role)
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
            this.ListPost = listPost;
            this.UserName = username;
            this.Role = role;
        }

        public ProfileViewModelOut(DataRow row):base()
        {
            this.AccountID = (int)row["AccountId"];
            this.FirstName = row["FirstName"].ToString();
            this.LastName = row["LastName"].ToString();
            this.Gender = (row["Gender"] == null) ? true : (bool)row["Gender"];
            this.DOB = (row["DOB"] == null) ? new DateTime(1999, 01, 01) : (DateTime)row["DOB"];
            this.Email = row["Email"].ToString();
            this.Phone = row["Phone"].ToString();
            this.AvatarUri = row["Avatar"].ToString();
            this.Avatar = "";
            this.FollowerNumber = 0;
            this.ListPost = null;
            this.UserName = row["UserName"].ToString();
            this.Role = null;
        }
    }
}
