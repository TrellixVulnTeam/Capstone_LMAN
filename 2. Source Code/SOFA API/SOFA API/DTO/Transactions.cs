using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Transactions
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }
        public double Amount { get; set; }
        public int FromAccountId { get; set; }
        public int ToAccountID { get; set; }
        public DateTime Date { get; set; }
        public string CheckSum { get; set; }

        public Transactions()
        {
        }

        public Transactions(int iD, string name, int type, double amount, int fromAccountId, int toAccountID, DateTime date, string checkSum)
        {
            ID = iD;
            Name = name;
            Type = type;
            Amount = amount;
            FromAccountId = fromAccountId;
            ToAccountID = toAccountID;
            Date = date;
            CheckSum = checkSum;
        }
    }
}
