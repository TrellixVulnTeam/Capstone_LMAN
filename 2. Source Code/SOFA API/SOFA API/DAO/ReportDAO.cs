using SOFA_API.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class ReportDAO
    {
        private static ReportDAO instance;

        public static ReportDAO Instance
        {
            get
            {
                if (instance == null) instance = new ReportDAO();
                return instance;
            }
            private set { instance = value; }
        }
        public ReportDAO()
        {

        }

        public List<ReportType> GetAllTypeReport()
        {
            List<ReportType> reportTypes = new List<ReportType>();

            string sql = "EXEC GetAllTypeReport";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql);
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    reportTypes.Add(new ReportType(row));
                }
            }

            return reportTypes;
        }

        public ReportType GetReportTypeByID(int typeID)
        {
            ReportType reportType = null;

            string sql = "EXEC GetReportTypeByID @typeID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { typeID });
            if (data.Rows.Count > 0)
            {
                reportType = new ReportType(data.Rows[0]);
            }

            return reportType;
        }

        public Report AddReportType(string name, string des)
        {
            Report report = null;

            string sql = "EXEC AddReportType @name , @des";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { name, des });
            if (data.Rows.Count > 0)
            {
                report = new Report(data.Rows[0]);
            }

            return report;
        }

        public int DeleteTypeReportByID(int typeID)
        {
            int res = 0;

            string sql = "EXEC DeleteTypeReportByID @typeID";
            res = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { typeID });

            return res;
        }
        public int UpdateReportType(string name, string des)
        {
            int res = 0;

            string sql = "EXEC UpdateReportType @name , @des";
            res = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { name, des });

            return res;
        }

        public List<Reason> GetAllReason()
        {
            List<Reason> reasons = new List<Reason>();

            string sql = "EXEC GetAllReason";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql);
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    reasons.Add(new Reason(row));
                }
            }

            return reasons;
        }
        public Reason AddReason(string name, string des)
        {
            Reason reason = null;

            string sql = "EXEC AddReason @name , @des";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { name, des });

            if (data.Rows.Count > 0)
            {
                reason = new Reason(data.Rows[0]);
            }

            return reason;
        }
        public int DeleteReasonByID(int reasonID)
        {
            int res = 0;

            string sql = "EXEC DeleteReasonByID @reasonID";

            res = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { reasonID });

            return res;
        }
        public int UpdateReason(string name, string des)
        {
            int res = 0;

            string sql = "EXEC UpdateReason @name , @des";
            res = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { name, des });

            return res;
        }
        public List<Report> GetAllReport()
        {
            List<Report> reports = new List<Report>();

            string sql = "EXEC GetAllReport";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql);
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    reports.Add(new Report(row));
                }
            }

            return reports;
        }
        public List<Report> GetAllReportFromAccount(int accountID)
        {
            List<Report> reports = new List<Report>();

            string sql = "EXEC GetAllReportFromAccount @accountID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountID });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    reports.Add(new Report(row));
                }
            }

            return reports;
        }
        public List<Report> GetAllReportToAccount(int accountID)
        {
            List<Report> reports = new List<Report>();

            string sql = "EXEC GetAllReportToAccount @accountID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountID });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    reports.Add(new Report(row));
                }
            }

            return reports;
        }
        public List<Report> GetAllReportToPost(int postID)
        {
            List<Report> reports = new List<Report>();

            string sql = "EXEC GetAllReportToPost @postID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { postID });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    reports.Add(new Report(row));
                }
            }

            return reports;
        }
        public List<Report> GetAllReportToComment(int commentID)
        {
            List<Report> reports = new List<Report>();

            string sql = "EXEC GetAllReportToAccount @commentID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { commentID });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    reports.Add(new Report(row));
                }
            }

            return reports;
        }
        public List<Report> GetAllReportPost()
        {
            List<Report> reports = new List<Report>();

            string sql = "EXEC GetAllReportPost";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql);
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    reports.Add(new Report(row));
                }
            }

            return reports;
        }
        public List<Report> GetAllReportUser()
        {
            List<Report> reports = new List<Report>();

            string sql = "EXEC GetAllReportUser";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql);
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    reports.Add(new Report(row));
                }
            }

            return reports;
        }
        public List<Report> GetAllReportComment()
        {
            List<Report> reports = new List<Report>();

            string sql = "EXEC GetAllReportComment";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql);
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    reports.Add(new Report(row));
                }
            }

            return reports;
        }
        public List<Reason> GetAllReasonOfReport(int reportID)
        {
            List<Reason> reasons = new List<Reason>();

            string sql = "EXEC GetAllReasonOfReport @reportID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { reportID });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    reasons.Add(new Reason(row));
                }
            }
            return reasons;
        }
        public Report CreateReport(int fromAccount, int toAccount, int toPost, int toComment, int typeReport, string reportContent)
        {
            Report report = null;

            string sql = "EXEC CreateReport @fromAccount , @toAccount , @toPost , @toComment , @typeReport , @reportContent";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { fromAccount, toAccount, toPost, toComment, typeReport, reportContent });
            if (data.Rows.Count > 0)
            {
                report = new Report(data.Rows[0]);
            }

            return report;
        }
        public ReportReason AddReasonForReport(int reportID, int reasonID)
        {
            ReportReason reason = null;

            string sql = "EXEC AddReasonForReport @reportID , @reasonID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { reportID, reasonID });

            if (data.Rows.Count > 0)
            {
                reason = new ReportReason(data.Rows[0]);
            }

            return reason;
        }
    }
}
