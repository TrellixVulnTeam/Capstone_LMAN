using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Account;
using SOFA_API.ViewModel.PostViewModel;
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

        internal ReportViewModelOut AdminGetAllReport()
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                reportViewModelOut = GetAllReport();
                for (int i = 0; i < reportViewModelOut.ListReport.Count; i++)
                {
                    AccountViewModelOut account = AccountDAO.Instance.GetUserById(reportViewModelOut.ListReport[i].FromAccount);
                    if (account != null)
                    {
                        reportViewModelOut.ListReport[i].FromAccountName = account.Firstname + " " + account.Lastname;
                    }
                    if (reportViewModelOut.ListReport[i].ToAccount != 0)
                    {
                        AccountViewModelOut toAccount = AccountDAO.Instance.GetUserById(reportViewModelOut.ListReport[i].ToAccount);
                        reportViewModelOut.ListReport[i].ToAccountName = toAccount.Firstname + " " + toAccount.Lastname;
                    }
                    if (reportViewModelOut.ListReport[i].ToPost != 0)
                    {
                        AdminPostInfoModel postInfo = PostDAO.Instance.GetPostInfo(reportViewModelOut.ListReport[i].ToPost);
                        if (postInfo != null)
                        {
                            reportViewModelOut.ListReport[i].ToAccountName = postInfo.Firstname + " " + postInfo.Lastname;
                            reportViewModelOut.ListReport[i].ToAccount = postInfo.AccountPost;
                        } else
                        {
                            reportViewModelOut.ListReport[i].ToAccountName = "deleted post";
                            reportViewModelOut.ListReport[i].ToAccount = 0;
                        }
                    }
                }
                return reportViewModelOut;
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

        internal ReportViewModelOut CreateReport(ReportViewModelIn reportViewModelIn)
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                ReportModelOut reportModelOut = new ReportModelOut();
                Report report = ReportDAO.Instance.CreateReport(reportViewModelIn.FromAccount, reportViewModelIn.ToAccount, reportViewModelIn.ToPost, reportViewModelIn.ToComment, reportViewModelIn.TypeReport, reportViewModelIn.ReportContent);
                if (report.ID > 0)
                {
                    reportModelOut.SetReport(report);
                    reportModelOut.TypeReport = ReportDAO.Instance.GetReportTypeByID(report.TypeReport);
                    foreach (int reasonID in reportViewModelIn.ListReason)
                    {
                        ReportReason reportReason = ReportDAO.Instance.AddReasonForReport(report.ID, reasonID);
                    }
                    reportModelOut.ListReason = ReportDAO.Instance.GetAllReasonOfReport(report.ID);
                    reportViewModelOut.ListReport.Add(reportModelOut);
                    reportViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    reportViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                }
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

        internal ReportViewModelOut HandleUserReport(int reportId, int userId)
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                int flag = AccountDAO.Instance.BanUser(userId);
                if (flag > 0)
                {
                    int result = ReportDAO.Instance.UpdateReportStatus(reportId);
                    if (result > 0)
                    {
                        reportViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    }
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                reportViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                reportViewModelOut.ErrorMessage = e.ToString();
            }

            return reportViewModelOut;
        }

        internal ReportViewModelOut HandlePostReport(int reportId, int postId)
        {
            ReportViewModelOut reportViewModelOut = new ReportViewModelOut();

            try
            {
                int flag = PostDAO.Instance.DeletePostByPostID(postId);
                if (flag > 0)
                {
                    int result = ReportDAO.Instance.UpdateReportStatus(reportId);
                    if (result > 0)
                    {
                        reportViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    }
                }
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
