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
        public int PostNumber { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public bool IsFashionista { get; set; }
        public List<ProfileFollowerViewModelOut> ListFollower { get; set; }
        public ProfileViewModelOut() : base()
        {

        }

        public ProfileViewModelOut(int accountID, string firstName, string lastName, bool gender, DateTime dOB, string email, string phone, string address, string avatarUri, string avatar, int followerNumber, int postNumber, string userName, string role, bool isFashionista, List<ProfileFollowerViewModelOut> listFollower)
        {
            AccountID = accountID;
            FirstName = firstName;
            LastName = lastName;
            Gender = gender;
            DOB = dOB;
            Email = email;
            Phone = phone;
            Address = address;
            AvatarUri = avatarUri;
            Avatar = avatar;
            FollowerNumber = followerNumber;
            PostNumber = postNumber;
            UserName = userName;
            Role = role;
            IsFashionista = isFashionista;
            ListFollower = listFollower;
        }

        public ProfileViewModelOut(DataRow row) : base()
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
            this.ListFollower = null;
            IsFashionista = Convert.IsDBNull(row["isFashionista"]) ? false : (bool)row["IsFashionista"];
        }
    }
}
