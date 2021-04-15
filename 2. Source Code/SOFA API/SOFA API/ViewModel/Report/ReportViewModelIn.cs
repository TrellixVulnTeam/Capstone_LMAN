using SOFA_API.DTO;
using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Report
{
    public class ReportViewModelIn : BaseModelIn
    {
        public int ID { get; set; }
        public int FromAccount { get; set; }
        public int ToAccount { get; set; }
        public int ToPost { get; set; }
        public int ToComment { get; set; }
        public int TypeReport { get; set; }
        public string ReportContent { get; set; }
        public List<int> ListReason { get; set; }

        public ReportViewModelIn() : base()
        {
            ListReason = new List<int>();
        }

        public ReportViewModelIn(int iD, int fromAccount, int toAccount, int toPost, int toComment, int typeReport, string reportContent, List<int> listReason)
        {
            ID = iD;
            FromAccount = fromAccount;
            ToAccount = toAccount;
            ToPost = toPost;
            ToComment = toComment;
            TypeReport = typeReport;
            ReportContent = reportContent;
            ListReason = listReason;
        }
    }
}
