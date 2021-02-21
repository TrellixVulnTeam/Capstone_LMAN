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
        public int ID { get; set; }
        public int AccountID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Gender { get; set; }
        public DateTime DOB { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string AvatarUri { get; set; }
        public byte[] Avatar { get; set; }
        public int FollowerNumber { get; set; }
        public List<Post> ListPost { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public ProfileViewModelOut():base()
        {

        }
        public ProfileViewModelOut(int iD, int accountID, string firstName, string lastName, bool gender, DateTime dOB, string email, string phone, string address, string avatarUri, byte[] avatar, int followerNumber, List<Post> listPost, string username, string role)
        {
            this.ID = iD;
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
            this.ID = (int)row["Id"];
            this.AccountID = (int)row["AccountId"];
            this.FirstName = row["FirstName"].ToString();
            this.LastName = row["LastName"].ToString();
            this.Gender = (bool)row["Gender"];
            this.DOB = (DateTime)row["DOB"];
            this.Email = row["Email"].ToString();
            this.Phone = row["Phone"].ToString();
            this.AvatarUri = row["Avatar"].ToString();
            this.Avatar = null;
            this.FollowerNumber = 0;
            this.ListPost = null;
            this.UserName = row["UserName"].ToString();
            this.Role = null;
        }
    }
}
