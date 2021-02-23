﻿using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Balance
{
    public class TopUpAccountModelOut : BaseModelOut
    {
        public int AccountId { get; set; }
        public int AdminId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public string CheckSum { get; set; }
        public DateTime DateSuccess { get; set; }

        public TopUpAccountModelOut()
        {
        }

        public TopUpAccountModelOut(int accountId, int adminId, decimal amount, string description, string checkSum, DateTime dateSuccess)
        {
            AccountId = accountId;
            AdminId = adminId;
            Amount = amount;
            Description = description;
            CheckSum = checkSum;
            DateSuccess = dateSuccess;
        }

        public TopUpAccountModelOut(DataRow row)
        {
            AccountId = (int)row["AccountId"];
            AdminId = (row["AdminId"] == null) ? 0 : (int)row["AdminId"];
            Amount = (decimal)row["AccountId"];
            Description = row["Description"].ToString();
            CheckSum = row["CheckSum"].ToString();
            DateSuccess = (DateTime)row["Date"];
        }
    }
}