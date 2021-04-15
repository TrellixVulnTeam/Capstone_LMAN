using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Report
{
    public class ReportViewModelOut : BaseModelOut
    {
        public List<ReportModelOut> ListReport { get; set; }

        public ReportViewModelOut() : base()
        {
            ListReport = new List<ReportModelOut>();
        }

        public ReportViewModelOut(List<ReportModelOut> listReport) : base()
        {
            ListReport = listReport;
        }
}
}
