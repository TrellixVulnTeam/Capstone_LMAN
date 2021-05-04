using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Account
{
    public class AccountViewModelOut : BaseModelOut
    {
        public int Id { get; set; }
        public string Username
        { get; set; }
        public string Password
        { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; }
        public string Token { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public bool IsBlock { get; set; }

        public AccountViewModelOut():base()
        {
        }

        public AccountViewModelOut(int id, string username, string password, int roleId, string roleName, string email, 
            string phone, bool isActive, string token, string firstname, string lastname)
        {
            Id = id;
            Username = username;
            Password = password;
            RoleId = roleId;
            RoleName = roleName;
            Email = email;
            Phone = phone;
            IsActive = isActive;
            Token = token;
            Firstname = firstname;
            Lastname = lastname;
        }

        public AccountViewModelOut(DataRow row) : base()
        {
            Id = Int32.Parse(row["Id"].ToString());
            Username = row["username"].ToString();
            Password = row["password"].ToString();
            RoleId = Int32.Parse(row["roleId"].ToString());
            RoleName = row["roleName"].ToString();
            Email = row["email"].ToString();
            Phone = row["phone"].ToString();
            IsActive = Boolean.Parse(row["IsActive"].ToString());
            Firstname = Convert.IsDBNull(row["FirstName"]) ? "" : row["FirstName"].ToString();
            Lastname = Convert.IsDBNull(row["LastName"]) ? "" : row["LastName"].ToString();
            IsBlock = Boolean.Parse(row["IsBlock"].ToString());
        }
    }
}
