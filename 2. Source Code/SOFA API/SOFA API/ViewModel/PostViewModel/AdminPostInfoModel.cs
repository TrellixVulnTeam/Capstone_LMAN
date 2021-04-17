using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.PostViewModel
{
    public class AdminPostInfoModel
    {
        public int Id { get; set; }
        public int AccountPost { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public AdminPostInfoModel()
        {
        }
        public AdminPostInfoModel(DataRow row)
        {
            Id = (int)row["Id"];
            Firstname = row["Firstname"].ToString();
            Lastname = row["Lastname"].ToString();
            AccountPost = (int)row["AccountPost"];
        }
    }
}
