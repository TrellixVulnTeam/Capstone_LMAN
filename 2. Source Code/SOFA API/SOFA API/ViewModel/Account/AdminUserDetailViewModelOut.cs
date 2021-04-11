using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Account
{
    public class AdminUserDetailViewModelOut : BaseModelOut
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DoB { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }
        public double Height { get; set; }
        public double Weight { get; set; }
        public double BustSize { get; set; }
        public double WaistSize { get; set; }
        public double HipSize { get; set; }

        public AdminUserDetailViewModelOut()
        {
        }

        public AdminUserDetailViewModelOut(DataRow row)
        {
            Id = (int)row["Id"];
            UserName = row["UserName"].ToString();
            IsActive = (bool)row["IsActive"];
            DateCreated = Convert.IsDBNull(row["DateCreated"]) ? DateTime.Now : (DateTime)row["DateCreated"];
            DoB = Convert.IsDBNull(row["DOB"]) ? DateTime.Now : (DateTime)row["DOB"];
            FirstName = row["FirstName"].ToString();
            LastName = row["LastName"].ToString();
            Gender = Convert.IsDBNull(row["Gender"]) ? false : (bool)row["Gender"];
            Email = Convert.IsDBNull(row["Email"]) ? "" : row["Email"].ToString();
            Phone = Convert.IsDBNull(row["Phone"]) ? "" : row["Phone"].ToString();
            Address = Convert.IsDBNull(row["Address"]) ? "" : row["Address"].ToString();
            Avatar = Convert.IsDBNull(row["Avatar"]) ? "" : row["Avatar"].ToString();
            Height = Convert.IsDBNull(row["Height"]) ? 0 : (double)row["Height"];
            Weight = Convert.IsDBNull(row["Weight"]) ? 0 : (double)row["Weight"];
            BustSize = Convert.IsDBNull(row["BustSize"]) ? 0 : (double)row["BustSize"];
            WaistSize = Convert.IsDBNull(row["WaistSize"]) ? 0 : (double)row["WaistSize"];
            HipSize = Convert.IsDBNull(row["HipSize"]) ? 0 : (double)row["HipSize"];
        }
    }
}
