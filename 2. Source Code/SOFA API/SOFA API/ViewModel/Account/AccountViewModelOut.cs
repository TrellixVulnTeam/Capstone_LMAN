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

        public AccountViewModelOut():base()
        {
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
        }
    }
}
