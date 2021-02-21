using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class TransactionType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public TransactionType()
        {
        }
        public TransactionType(int id, string name, string description)
        {
            Id = id;
            Name = name;
            Description = description;
        }

        public TransactionType(DataRow row)
        {
            Id = (int)row["id"];
            Name = row["Name"].ToString();
            Description = row["Description"].ToString();
        }
    }
}
