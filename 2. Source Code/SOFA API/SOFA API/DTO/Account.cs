using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Account
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public Account() { }
        public Account(int iD, string userName, string passWord)
        {
            ID = iD;
            UserName = userName;
            PassWord = passWord;
        }
    }
}
