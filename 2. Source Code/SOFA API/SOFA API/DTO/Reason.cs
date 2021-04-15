using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Reason
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public Reason()
        {
        }

        public Reason(int iD, string name, string description)
        {
            ID = iD;
            Name = name;
            Description = description;
        }

        public Reason(DataRow row)
        {
            ID = (int)row["iD"];
            Name = row["name"].ToString();
            Description = row["description"].ToString();
        }
    }
}
