using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Voucher
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsExprires { get; set; }

        public Voucher()
        {
        }

        public Voucher(int id, string title, string content, string description, string code, int quantity, string image, DateTime fromDate, DateTime toDate, bool isExprires)
        {
            Id = id;
            Title = title;
            Content = content;
            Description = description;
            Code = code;
            Quantity = quantity;
            Image = image;
            FromDate = fromDate;
            ToDate = toDate;
            IsExprires = isExprires;
        }

        public Voucher(DataRow row)
        {
            Id = (int)row["Id"];
            Title = row["Title"].ToString();
            Code = row["Code"].ToString();
            Content = row["Content"].ToString();
            Description = row["Description"].ToString();
            Code = row["Code"].ToString();
            Quantity = (row["Quantity"] == null) ? -1 : (int)row["Quantity"];
            Image = row["Image"].ToString(); ;
            FromDate = (DateTime)row["FromDate"];
            ToDate = (DateTime)row["ToDate"]; ;
            IsExprires = (bool)row["IsExpires"];
        }
    }
}
