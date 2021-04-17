using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Support
{
    public class DetailUserSupportModel
    {
        public int UserId { get; set; }
        public int RequestId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime TimeCreate { get; set; }
        public int Status { get; set; }

        public DetailUserSupportModel()
        {
        }

        public DetailUserSupportModel(DataRow row)
        {
            UserId = (int)row["UserId"];
            RequestId = (int)row["RequestId"];
            Username = row["Username"].ToString();
            Email  = row["Email"].ToString();
            Phone = row["Phone"].ToString();
            Firstname = row["Firstname"].ToString();
            Lastname = row["Lastname"].ToString();
            TimeCreate = (DateTime)row["TimeCreate"];
            Status = (int)row["Status"];
        }
    }
}
