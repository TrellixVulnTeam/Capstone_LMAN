using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace TestJWT.ViewModel
{
    public class AccountViewModel
    {
        public int ID
        { get; set; }
        public string UserName
        { get; set; }
        public string PassWord
        { get; set; }
        public string Role
        { get; set; }
        public string FirstName
        { get; set; }
        public string LastName
        { get; set; }
        public string Gender
        { get; set; }
        public DateTime DOB
        { get; set; }
        public byte[] Avatar
        { get; set; }
        public string AvatarUri
        { get; set; }
        public AccountViewModel() { }
        public AccountViewModel(DataRow row)
        {
            ID = (int)row["id"];
            UserName = row["username"].ToString();
            PassWord = row["password"].ToString();
            Role = row["role"].ToString();
            FirstName = row["firstname"].ToString();
            LastName = row["lastname"].ToString();
            Gender = row["gender"].ToString();
            DOB = DateTime.Parse(row["dob"].ToString());
            Avatar = null;
            //AvatarUri = row["avatar"].ToString();
        }
    }
}
