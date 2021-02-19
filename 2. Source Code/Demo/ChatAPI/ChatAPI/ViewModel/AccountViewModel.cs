using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAPI.ViewModel
{
    public class AccountViewModel
    {
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public string Avatar { get; set; }
        public AccountViewModel()
        {
        }
        public AccountViewModel(string userName, string passWord, string avatar)
        {
            UserName = userName;
            PassWord = passWord;
            Avatar = avatar;
        }
        public AccountViewModel(DataRow row)
        {
            UserName = row["username"].ToString();
            PassWord = row["password"].ToString();
            Avatar = row["avatar"].ToString();
        }
    }
}
