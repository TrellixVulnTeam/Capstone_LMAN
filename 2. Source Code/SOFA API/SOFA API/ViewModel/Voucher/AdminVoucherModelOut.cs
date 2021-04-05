using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Voucher
{
    public class AdminVoucherModelOut
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Code { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ExpiredDate { get; set; }

        public AdminVoucherModelOut(DataRow row) : base()
        {
            Id = (int)row["Id"];
            Title = row["title"].ToString();
            Content = row["Content"].ToString();
            Code = row["Code"].ToString();
            CreatedBy = row["CreatedBy"].ToString();
            ExpiredDate = (DateTime)row["ExpiredDate"];
        }
    }
}
