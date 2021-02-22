using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Account
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public bool IsActive { get; set; }
        public bool IsBlock { get; set; }
        public Account() { }

        public Account(int iD, string userName, string passWord, bool isActive, bool isBlock)
        {
            ID = iD;
            UserName = userName;
            PassWord = passWord;
            IsActive = isActive;
            IsBlock = isBlock;
        }
        public Account(DataRow row)
        {
            ID = (int)row["id"];
            UserName = row["userName"].ToString();
            PassWord = row["passWord"].ToString();
            IsActive = (bool)row["isActive"];
            IsBlock = (bool)row["isBlock"];
        }
    }
}
