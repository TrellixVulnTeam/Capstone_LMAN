using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestJWT.ViewModel;

namespace TestJWT.DTO
{
    public class Account
    {
        public int ID
        { get; set; }
        public string UserName
        { get; set; }
        public string PassWord
        { get; set; }
        public string Role
        { get; set; }
        public Account() { }
        public Account(int id, string userName, string passWord, string role)
        {
            ID = id;
            UserName = userName;
            PassWord = passWord;
            Role = role;
        }
        public Account(AccountViewModel accountViewModel)
        {
            ID = accountViewModel.ID;
            UserName = accountViewModel.UserName;
            PassWord = accountViewModel.PassWord;
            Role = accountViewModel.Role;
        }
    }
}
