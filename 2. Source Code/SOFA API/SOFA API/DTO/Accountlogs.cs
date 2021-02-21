using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Accountlogs
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public double BeforeBalance { get; set; }
        public double AfterBalance { get; set; }
        public string CheckSum { get; set; }
        public int TransactionID { get; set; }
        public Accountlogs()
        {
        }

        public Accountlogs(int iD, int accountID, double beforeBalance, double afterBalance, string checkSum, int transactionID)
        {
            ID = iD;
            AccountID = accountID;
            BeforeBalance = beforeBalance;
            AfterBalance = afterBalance;
            CheckSum = checkSum;
            TransactionID = transactionID;
        }
        public Accountlogs(DataRow row)
        {
            ID = (int)row["id"];
            AccountID = (int)row["AccountID"];
            BeforeBalance = (double)row["BeforeBalance"];
            AfterBalance = (double)row["AfterBalance"];
            CheckSum = row["CheckSum"].ToString();
            TransactionID =(int) row["TransactionID"];
        }
    }
}
