using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Balance
{
    public class TopUpAccountModelIn : BaseModelIn
    {
        public int AccountId { get; set; }
        public int AdminId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }

        public TopUpAccountModelIn()
        {
        }

        public TopUpAccountModelIn(int accountId, int adminId, decimal amount, string description)
        {
            AccountId = accountId;
            AdminId = adminId;
            Amount = amount;
            Description = description;
        }
        public TopUpAccountModelIn(DataRow row)
        {
            AccountId = (int)row["AccountId"];
            AdminId = (row["AdminId"] == null) ? -1 : (int)row["AdminId"];
            Amount = (decimal)row["AccountId"];
            Description = row["Description"].ToString();
        }
    }
}
