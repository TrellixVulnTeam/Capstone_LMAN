using System;
using System.Data;


namespace SOFA_API.DTO
{
    public class Profile
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
        public Profile()
        {

        }
        public Profile(int accountID, string firstName, string lastName, bool gender, DateTime dOB, string email, string phone, string address, string avatarUri)
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
        }

        public Profile(DataRow row)
        {
            this.AccountID = (int)row["AccountId"];
            this.FirstName = row["FirstName"].ToString();
            this.LastName = row["LastName"].ToString();
            this.Gender = (row["Gender"] == null) ? true : (bool)row["Gender"];
            this.DOB = (row["DOB"] == null) ? new DateTime(1999,01,01) : (DateTime) row["DOB"];
            this.Email = row["Email"].ToString();
            this.Phone = row["Phone"].ToString();
            this.Address = row["Address"].ToString();
            this.AvatarUri = row["Avatar"].ToString();
        }
    }
}
