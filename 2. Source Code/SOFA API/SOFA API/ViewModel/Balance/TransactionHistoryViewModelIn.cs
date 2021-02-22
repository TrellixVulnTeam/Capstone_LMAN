using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Balance
{
    public class TransactionHistoryViewModelIn : BaseModelIn
    {
        public int TransactionId { get; set; }
        public decimal BeforeBalance { get; set; }
        public decimal AfterBalance { get; set; }
        public decimal Amount { get; set; }
        public int TypeID { get; set; }
        public DateTime TransactionTime { get; set; }
        public int AccountId { get; set; }
        public int AdminId { get; set; }

        public TransactionHistoryViewModelIn()
        {
        }

        public TransactionHistoryViewModelIn(int transactionId, decimal beforeBalance, decimal afterBalance, decimal amount, int typeID, DateTime transactionTime, int accountId, int adminId)
        {
            TransactionId = transactionId;
            BeforeBalance = beforeBalance;
            AfterBalance = afterBalance;
            Amount = amount;
            TypeID = typeID;
            TransactionTime = transactionTime;
            AccountId = accountId;
            AdminId = adminId;
        }

        public TransactionHistoryViewModelIn(DataRow row)
        {
            TransactionId = (int)row["TransactionID"];
            BeforeBalance = (row["BeforeBalance"] == null) ? 0 : (decimal)row["BeforeBalance"];
            AfterBalance = (row["AfterBalance"] == null) ? 0 : (decimal)row["AfterBalance"];
            Amount = (decimal)row["Amount"];
            TypeID = (int)row["TypeID"];
            TransactionTime = (DateTime)row["TransactionTime"];
            AccountId = (int)row["AccountId"];
            AdminId = (row["AdminId"] == null) ? 0 : (int)row["AdminId"];
        }
    }
}

