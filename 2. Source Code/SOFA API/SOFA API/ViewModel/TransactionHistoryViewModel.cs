using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel
{
    public class TransactionHistoryViewModel
    {
        public int TransactionId { get; set; }
        public decimal BeforeBalance { get; set; }
        public decimal AfterBalance { get; set; }
        public decimal Amount { get; set; }
        public int TypeID { get; set; }
        public DateTime TransactionTime { get; set; }
        public int FromAccountId { get; set; }
        public int ToAccountID { get; set; }

        public TransactionHistoryViewModel()
        {
        }

        public TransactionHistoryViewModel(int transactionId, decimal beforeBalance, decimal afterBalance, decimal amount, int typeID, DateTime transactionTime, int fromAccountId, int toAccountID)
        {
            TransactionId = transactionId;
            BeforeBalance = beforeBalance;
            AfterBalance = afterBalance;      
            Amount = amount;
            TypeID = typeID;
            TransactionTime = transactionTime;
            FromAccountId = fromAccountId;
            ToAccountID = toAccountID;
        }

        public TransactionHistoryViewModel(DataRow row)
        {
            TransactionId = (int)row["TransactionID"];
            BeforeBalance = (decimal)row["BeforeBalance"];
            AfterBalance = (decimal)row["AfterBalance"];
            Amount = (decimal)row["Amount"];
            TypeID = (int)row["TypeID"];
            TransactionTime = (DateTime)row["TransactionTime"];
            FromAccountId = (int)row["FromAccountId"];
            ToAccountID = (int)row[ToAccountID];
        }
    }
}
