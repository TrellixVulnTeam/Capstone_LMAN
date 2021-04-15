using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class ReportService
    {
        private static ReportService instance;
        public static ReportService Instance
        {
            get
            {
                if (instance == null) instance = new ReportService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }

        internal ReportViewModelOut GetAllReport()
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                List<Report> reports = ReportDAO.Instance.GetAllReport();
                foreach (Report report in reports)
                {
                    ReportModelOut reportModelOut = new ReportModelOut();
                    reportModelOut.SetReport(report);
                    reportModelOut.ListReason = ReportDAO.Instance.GetAllReasonOfReport(report.ID);
                    reportModelOut.TypeReport = ReportDAO.Instance.GetReportTypeByID(report.TypeReport);
                    reportViewModelOut.ListReport.Add(reportModelOut);
                }
                reportViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                reportViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                reportViewModelOut.ErrorMessage = e.ToString();
            }

            return reportViewModelOut;
        }

        internal ReportViewModelOut GetAllReason()
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                ReportModelOut reportModelOut = new ReportModelOut();
                reportModelOut.ListReason = ReportDAO.Instance.GetAllReason();
                reportViewModelOut.ListReport.Add(reportModelOut);
                reportViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                reportViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                reportViewModelOut.ErrorMessage = e.ToString();
            }

            return reportViewModelOut;
        }

        internal ReportViewModelOut GetAllReportFromAccount(int accountnID)
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                List<Report> reports = ReportDAO.Instance.GetAllReportFromAccount(accountnID);
                foreach (Report report in reports)
                {
                    ReportModelOut reportModelOut = new ReportModelOut();
                    reportModelOut.SetReport(report);
                    reportModelOut.ListReason = ReportDAO.Instance.GetAllReasonOfReport(report.ID);
                    reportModelOut.TypeReport = ReportDAO.Instance.GetReportTypeByID(report.TypeReport);
                    reportViewModelOut.ListReport.Add(reportModelOut);
                }
                reportViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                reportViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                reportViewModelOut.ErrorMessage = e.ToString();
            }

            return reportViewModelOut;
        }

        internal ReportViewModelOut GetAllReportToAccount(int accountID)
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                List<Report> reports = ReportDAO.Instance.GetAllReportToAccount(accountID);
                foreach (Report report in reports)
                {
                    ReportModelOut reportModelOut = new ReportModelOut();
                    reportModelOut.SetReport(report);
                    reportModelOut.ListReason = ReportDAO.Instance.GetAllReasonOfReport(report.ID);
                    reportModelOut.TypeReport = ReportDAO.Instance.GetReportTypeByID(report.TypeReport);
                    reportViewModelOut.ListReport.Add(reportModelOut);
                }
                reportViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                reportViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                reportViewModelOut.ErrorMessage = e.ToString();
            }

            return reportViewModelOut;
        }

        internal ReportViewModelOut GetAllReportToPost(int postID)
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                List<Report> reports = ReportDAO.Instance.GetAllReportToPost(postID);
                foreach (Report report in reports)
                {
                    ReportModelOut reportModelOut = new ReportModelOut();
                    reportModelOut.SetReport(report);
                    reportModelOut.ListReason = ReportDAO.Instance.GetAllReasonOfReport(report.ID);
                    reportModelOut.TypeReport = ReportDAO.Instance.GetReportTypeByID(report.TypeReport);
                    reportViewModelOut.ListReport.Add(reportModelOut);
                }
                reportViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                reportViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                reportViewModelOut.ErrorMessage = e.ToString();
            }

            return reportViewModelOut;
        }

        internal ReportViewModelOut GetAllReportToComment(int commentID)
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                List<Report> reports = ReportDAO.Instance.GetAllReportToComment(commentID);
                foreach (Report report in reports)
                {
                    ReportModelOut reportModelOut = new ReportModelOut();
                    reportModelOut.SetReport(report);
                    reportModelOut.ListReason = ReportDAO.Instance.GetAllReasonOfReport(report.ID);
                    reportModelOut.TypeReport = ReportDAO.Instance.GetReportTypeByID(report.TypeReport);
                    reportViewModelOut.ListReport.Add(reportModelOut);
                }
                reportViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                reportViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                reportViewModelOut.ErrorMessage = e.ToString();
            }

            return reportViewModelOut;
        }

        internal ReportViewModelOut GetAllReportPost()
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                List<Report> reports = ReportDAO.Instance.GetAllReportPost();
                foreach (Report report in reports)
                {
                    ReportModelOut reportModelOut = new ReportModelOut();
                    reportModelOut.SetReport(report);
                    reportModelOut.ListReason = ReportDAO.Instance.GetAllReasonOfReport(report.ID);
                    reportModelOut.TypeReport = ReportDAO.Instance.GetReportTypeByID(report.TypeReport);
                    reportViewModelOut.ListReport.Add(reportModelOut);
                }
                reportViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                reportViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                reportViewModelOut.ErrorMessage = e.ToString();
            }

            return reportViewModelOut;
        }

        internal ReportViewModelOut GetAllReportUser()
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                List<Report> reports = ReportDAO.Instance.GetAllReportUser();
                foreach (Report report in reports)
                {
                    ReportModelOut reportModelOut = new ReportModelOut();
                    reportModelOut.SetReport(report);
                    reportModelOut.ListReason = ReportDAO.Instance.GetAllReasonOfReport(report.ID);
                    reportModelOut.TypeReport = ReportDAO.Instance.GetReportTypeByID(report.TypeReport);
                    reportViewModelOut.ListReport.Add(reportModelOut);
                }
                reportViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                reportViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                reportViewModelOut.ErrorMessage = e.ToString();
            }

            return reportViewModelOut;
        }

        internal ReportViewModelOut GetAllReportComment()
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                List<Report> reports = ReportDAO.Instance.GetAllReportComment();
                foreach (Report report in reports)
                {
                    ReportModelOut reportModelOut = new ReportModelOut();
                    reportModelOut.SetReport(report);
                    reportModelOut.ListReason = ReportDAO.Instance.GetAllReasonOfReport(report.ID);
                    reportModelOut.TypeReport = ReportDAO.Instance.GetReportTypeByID(report.TypeReport);
                    reportViewModelOut.ListReport.Add(reportModelOut);
                }
                reportViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                reportViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                reportViewModelOut.ErrorMessage = e.ToString();
            }

            return reportViewModelOut;
        }
    }
}
