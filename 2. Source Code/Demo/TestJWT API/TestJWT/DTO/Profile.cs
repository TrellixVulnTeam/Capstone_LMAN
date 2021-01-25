using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestJWT.ViewModel;

namespace TestJWT.DTO
{
    public class Profile
    {
        public int AccountID
        { get; set; }
        public string FirstName
        { get; set; }
        public string LastName
        { get; set; }
        public string Gender
        { get; set; }
        public DateTime DOB
        { get; set; }
        public Profile(int id, string firstName, string lastName, string gender, DateTime dOB)
        {
            AccountID = id;
            FirstName = firstName;
            LastName = lastName;
            Gender = gender;
            DOB = dOB;
        }
        public Profile(AccountViewModel accountViewModel)
        {
            AccountID = accountViewModel.ID;
            FirstName = accountViewModel.FirstName;
            LastName = accountViewModel.LastName;
            Gender = accountViewModel.Gender;
            DOB = accountViewModel.DOB;
        }
    }
}
