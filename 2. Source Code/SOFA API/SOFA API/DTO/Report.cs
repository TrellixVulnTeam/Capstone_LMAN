using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Report
    {
        public int ID { get; set; }
        public int FromAccount { get; set; }
        public int ToAccount { get; set; }
        public int ToPost { get; set; }
        public int ToComment { get; set; }
        public int TypeReport { get; set; }
        public string ReportContent { get; set; }
        public bool IsProcessed { get; set; }

        public Report()
        {
        }

        public Report(int iD, int fromAccount, int toAccount, int toPost, int toComment, int typeReport, string reportContent, bool isProcessed)
        {
            ID = iD;
            FromAccount = fromAccount;
            ToAccount = toAccount;
            ToPost = toPost;
            ToComment = toComment;
            TypeReport = typeReport;
            ReportContent = reportContent;
            IsProcessed = isProcessed;
        }
        public Report(DataRow row)
        {
            ID = (int)row["iD"];
            FromAccount = (int)row["fromAccount"];
            ToAccount = !Convert.IsDBNull(row["toAccount"]) ? (int)row["toAccount"] : 0;
            ToPost = !Convert.IsDBNull(row["toPost"]) ? (int)row["toPost"] : 0;
            ToComment = !Convert.IsDBNull(row["toComment"]) ? (int)row["toComment"] : 0;
            TypeReport = (int)row["typeReport"];
            ReportContent = !Convert.IsDBNull(row["ReportContent"]) ? row["ReportContent"].ToString() : "";
            IsProcessed =  (bool)row["isProcessed"];
        }
    }
}
