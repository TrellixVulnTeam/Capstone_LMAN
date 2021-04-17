using SOFA_API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Report
{
    public class ReportModelOut
    {
        public int ID { get; set; }
        public int FromAccount { get; set; }
        public string FromAccountName { get; set; }
        public int ToAccount { get; set; }
        public string ToAccountName { get; set; }
        public int ToPost { get; set; }
        public int ToComment { get; set; }
        public ReportType TypeReport { get; set; }
        public List<Reason> ListReason { get; set; }
        public string ReportContent { get; set; }
        public bool IsProcessed { get; set; }

        public ReportModelOut()
        {
            ListReason = new List<Reason>();
        }

        public ReportModelOut(int iD, int fromAccount, int toAccount, int toPost, int toComment, ReportType typeReport, List<Reason> listReason, string reportContent)
        {
            ID = iD;
            FromAccount = fromAccount;
            ToAccount = toAccount;
            ToPost = toPost;
            ToComment = toComment;
            TypeReport = typeReport;
            ListReason = listReason;
            ReportContent = reportContent;
        }
        public void SetReport(DTO.Report report)
        {
            ID = report.ID;
            FromAccount = report.FromAccount;
            ToAccount = report.ToAccount;
            ToPost = report.ToPost;
            ToComment = report.ToComment;
            ReportContent = report.ReportContent;
            IsProcessed = report.IsProcessed;
        }
    }
}
