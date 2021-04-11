using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Balance
{
    public class AdminUserbalanceModel
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int Type { get; set; }
        public DateTime DateCreated { get; set; }
        public string Description { get; set; }
        public AdminUserbalanceModel()
        {
        }

        public AdminUserbalanceModel(DataRow row)
        {
            Id = (int)row["Id"];
            Amount = (decimal)row["Amount"];
            Type = (int)row["Type"];
            DateCreated = (DateTime)row["Date"];
            Description = row["Description"].ToString();
        }
    }
}
