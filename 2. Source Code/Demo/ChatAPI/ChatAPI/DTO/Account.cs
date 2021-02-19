using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAPI.DTO
{
    public class Account
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }

        public Account()
        {
        }

        public Account(string userName, string passWord, string firstName, string lastName)
        {
            UserName = userName;
            PassWord = passWord;
            FirstName = firstName;
            LastName = lastName;
        }

        public Account(string userName, string passWord, string firstName, string lastName, string avatar) : this(userName, passWord, firstName, lastName)
        {
            Avatar = avatar;
        }

        public Account(int iD, string userName, string passWord, string firstName, string lastName, string avatar)
        {
            ID = iD;
            UserName = userName;
            PassWord = passWord;
            FirstName = firstName;
            LastName = lastName;
            Avatar = avatar;
        }

        public Account(int iD, string userName, string passWord, string firstName, string lastName)
        {
            ID = iD;
            UserName = userName;
            PassWord = passWord;
            FirstName = firstName;
            LastName = lastName;
        }

        public Account(DataRow row)
        {
            ID = (int)row["id"];
            UserName = row["username"].ToString();
            PassWord = row["password"].ToString();
            FirstName = row["firstname"].ToString();
            LastName = row["lastname"].ToString();
            Avatar = row["avatar"].ToString();
        }
    }
}
