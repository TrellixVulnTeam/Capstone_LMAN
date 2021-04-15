using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class ReportReason
    {
        public int ID { get; set; }
        public int ReportID { get; set; }
        public int ReasonID { get; set; }

        public ReportReason()
        {
        }

        public ReportReason(int iD, int reportID, int reasonID)
        {
            ID = iD;
            ReportID = reportID;
            ReasonID = reasonID;
        }

        public ReportReason(DataRow row)
        {
            ID = (int)row["Id"];
            ReportID = (int)row["reportID"];
            ReasonID = (int)row["reasonID"];
        }
    }
}
