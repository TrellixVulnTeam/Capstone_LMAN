﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SOFA_API.ViewModel.BaseModel;
using System.Data;



namespace SOFA_API.ViewModel.Voucher
{
    public class UpdateVoucherViewModelIn:BaseModelIn
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Code { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int Quantity { get; set; }

        public UpdateVoucherViewModelIn()
        {
        }

        public UpdateVoucherViewModelIn(int id, string title, string code, string content, string image, string description, DateTime fromDate, DateTime toDate, int quantity)
        {
            Id = id;
            Title = title;
            Code = code;
            Content = content;
            Image = image;
            Description = description;
            FromDate = fromDate;
            ToDate = toDate;
            Quantity = quantity;
        }

        public UpdateVoucherViewModelIn(DataRow row)
        {
            Id = (int)row["Id"];
            Title = row["title"].ToString();
            Code = row["Code"].ToString(); ;
            Content = row["Content"].ToString();
            Content = row["Description"].ToString();
            Image = row["Image"].ToString(); ;
            FromDate = (DateTime)row["FromDate"];
            ToDate = (DateTime)row["ToDate"];
            Quantity = (row["Quantity"] != null) ? -1 : (int)row["Quantity"];
        }
    }
}