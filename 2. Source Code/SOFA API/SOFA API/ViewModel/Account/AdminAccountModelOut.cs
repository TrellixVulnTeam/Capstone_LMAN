using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Account
{
    public class AdminAccountModelOut
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string AvatarUri { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsActive { get; set; }

        public AdminAccountModelOut(DataRow row) : base()
        {
            Id = Int32.Parse(row["Id"].ToString());
            Email = row["email"].ToString();
            UserName = row["userName"].ToString();
            FirstName = row["firstname"].ToString();
            LastName = row["lastname"].ToString();
            Phone = row["phone"].ToString();
            AvatarUri = row["avatar"].ToString();
            DateCreated = !row.IsNull("DateCreated") ? (DateTime)row["DateCreated"] : DateTime.Now;
            IsActive = Boolean.Parse(row["IsActive"].ToString());
        }
    }
}
