using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Profile
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string AvatarUri { get; set; }
        public Profile()
        {

        }
        public Profile(int iD, int accountID, string firstName, string lastName, DateTime dOB, string email, string phone, string address, string avatarUri)
        {
            this.ID = iD;
            this.AccountID = accountID;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.DOB = dOB;
            this.Email = email;
            this.Phone = phone;
            this.Address = address;
            this.AvatarUri = avatarUri;
        }
    }
}
