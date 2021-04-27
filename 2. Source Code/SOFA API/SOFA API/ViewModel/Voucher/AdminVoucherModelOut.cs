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
        public DateTime ExpiredDate { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }

        public AdminVoucherModelOut()
        {
        }

        public AdminVoucherModelOut(DataRow row) : base()
        {
            Id = (int)row["Id"];
            Title = row["title"].ToString();
            Content = row["Content"].ToString();
            Code = row["Code"].ToString();
            ExpiredDate = (DateTime)row["ToDate"];
            Quantity = (int)row["Quantity"];
            Image = row["Image"].ToString();
        }
    }
}
