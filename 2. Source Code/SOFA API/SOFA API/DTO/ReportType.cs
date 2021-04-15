using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class ReportType
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ReportType()
        {
        }

        public ReportType(int iD, string name, string description)
        {
            ID = iD;
            Name = name;
            Description = description;
        }

        public ReportType(DataRow row)
        {
            ID = (int)row["iD"];
            Name = row["name"].ToString();
            Description = row["description"].ToString();
        }
    }
}
