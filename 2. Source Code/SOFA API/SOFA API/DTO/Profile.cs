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
        public bool IsFashionista { get; set; }
        public bool IsActive { get; set; }
        public bool IsBlock { get; set; }

        public Profile()
        {

        }

        public Profile(int accountID, string firstName, string lastName, bool gender, DateTime dOB, string email, string phone, string address, string avatarUri, bool isFashionista, bool isActive, bool isBlock)
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
            IsFashionista = isFashionista;
            IsActive = isActive;
            IsBlock = isBlock;
        }

        public Profile(DataRow row)
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
            this.IsFashionista = Convert.IsDBNull(row["IsFashionista"]) ? false : (bool)row["IsFashionista"];
            IsActive = Convert.IsDBNull(row["IsActive"]) ? false : (bool)row["IsActive"];
            IsBlock = Convert.IsDBNull(row["IsBlock"]) ? false : (bool)row["IsBlock"];
        }
    }
}
