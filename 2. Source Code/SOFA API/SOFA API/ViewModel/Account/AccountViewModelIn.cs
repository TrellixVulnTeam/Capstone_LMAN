using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Account
{
    public class AccountViewModelIn : BaseModelIn
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool IsApplicationAccess { get; set; }
        public int TransactionId { get; set; }
        public int Code { get; set; }
        public bool IsAfterReset { get; set; }
        public int RoleId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime DateCreated { get; set; }

        public AccountViewModelIn():base()
        {
        }

        public AccountViewModelIn(string username, string password, string newPassword)
        {
            Username = username;
            Password = password;
            NewPassword = newPassword;
        }

        public AccountViewModelIn(string username, string password, string newPassword, string phone, bool isAfterReset)
        {
            Username = username;
            Password = password;
            NewPassword = newPassword;
            Phone = phone;
            IsAfterReset = isAfterReset;
        }

        public AccountViewModelIn(string username, string password, bool isApplicationAccess)
        {
            Username = username;
            Password = password;
            IsApplicationAccess = isApplicationAccess;
        }

        public AccountViewModelIn(string username, string password, string firstname, string lastname)
        {
            Username = username;
            Password = password;
            Firstname = firstname;
            Lastname = lastname;
        }

        public AccountViewModelIn(string username, string password, string newPassword, string email, string phone, bool isApplicationAccess, 
            int transactionId, int code, bool isAfterReset, int roleId, string firstname, string lastname):base()
        {
            Username = username;
            Password = password;
            NewPassword = NewPassword;
            Email = email;
            Phone = phone;
            IsApplicationAccess = isApplicationAccess;
            TransactionId = transactionId;
            Code = code;
            IsAfterReset = isAfterReset;
            RoleId = roleId;
            Firstname = firstname;
            Lastname = lastname;
        }

    }
}
