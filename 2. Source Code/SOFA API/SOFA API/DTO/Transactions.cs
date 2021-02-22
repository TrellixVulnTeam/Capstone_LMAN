using System;
using System.Collections.Generic;
using System.Data;
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
        public int AdminId { get; set; }
        public DateTime Date { get; set; }
        public string CheckSum { get; set; }
        public string Description { get; set; }

        public Transactions()
        {
        }

        public Transactions(int iD, string name, int type, double amount, int adminId, DateTime date, string checkSum, string description)
        {
            ID = iD;
            Name = name;
            Type = type;
            Amount = amount;
            AdminId = adminId;
            Date = date;
            CheckSum = checkSum;
            Description = description;
        }
        public Transactions(DataRow row)
        {
            ID = (int)row["Id"];
            Name = row["Name"].ToString();
            Type = (int)row["Type"];
            Amount = (double)row["Amount"];
            AdminId = (int)row["AdminId"];
            Date = (DateTime)row["Date"];
            CheckSum = row["CheckSum"].ToString();
            Description = row["Description"].ToString(); ;
        }
    }
}
