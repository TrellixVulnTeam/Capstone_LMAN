using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Voucher
{
    public class VoucherViewModelOut : BaseModelOut
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string VoucherCode { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsExpiress { get; set; }
        public bool IsUsed { get; set; }

        public VoucherViewModelOut() : base()
        {
        }

        public VoucherViewModelOut(int iD, string title, string voucherCode, string content, string description, string image, DateTime fromDate, DateTime toDate, bool isExpiress, bool isUsed)
        {
            ID = iD;
            Title = title;
            VoucherCode = voucherCode;
            Content = content;
            Description = description;
            Image = image;
            FromDate = fromDate;
            ToDate = toDate;
            IsExpiress = isExpiress;
            IsUsed = isUsed;
        }
        public VoucherViewModelOut(DataRow row) : base()
        {
            ID = (int)row["Id"];
            Title = row["Title"].ToString();
            VoucherCode = row["VoucherCode"].ToString();
            Content = row["Content"].ToString();
            Description = row["Description"].ToString();
            Image = row["Image"].ToString();
            FromDate = (DateTime)row["FromDate"];
            ToDate = (DateTime)row["ToDate"];
            IsExpiress = (bool)row["IsExpires"];
            IsUsed = (bool)row["IsUsed"];
        }
    }
}
