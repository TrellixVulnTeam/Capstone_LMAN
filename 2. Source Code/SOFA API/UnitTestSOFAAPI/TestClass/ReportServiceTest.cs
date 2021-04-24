using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Report;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class ReportServiceTest
    {
        [TestMethod]
        public void GetAllReport_ShouldReturnListReport()
        {
            //arrange


            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReport();

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }
        [TestMethod]
        public void GetAllReport_ShouldReturnList()
        {
            //arrange


            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReport();

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }

        [TestMethod]
        public void AdminGetAllReport_ShouldReturnListReport()
        {
            //arrange


            //act
            ReportViewModelOut report = ReportService.Instance.AdminGetAllReport();

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }

        [TestMethod]
        public void AdminGetAllReport_ShouldReturnList()
        {
            //arrange


            //act
            ReportViewModelOut report = ReportService.Instance.AdminGetAllReport();

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }

        [TestMethod]
        public void GetAllReason_ShouldReturnListReason()
        {
            //arrange


            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReason();

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }

        [TestMethod]
        public void GetAllReason_ShouldReturnList()
        {
            //arrange


            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReason();

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }

        [TestMethod]
        public void GetAllReportFromAccount_ShouldReturnListReason()
        {
            //arrange
            int accountId = 7;

            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReportFromAccount(accountId);

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }
        [TestMethod]
        public void GetAllReportFromAccount_ShouldReturnList()
        {
            //arrange
            int accountId = 7;

            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReportFromAccount(accountId);

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }

        [TestMethod]
        public void CreateReport_ShouldReturnListReason()
        {
            //arrange
            ReportViewModelIn reportViewModelIn = new ReportViewModelIn();
            reportViewModelIn.FromAccount = 7;
            reportViewModelIn.ToAccount = 4;
            reportViewModelIn.ToPost = 78;
            reportViewModelIn.ToComment = 0;
            reportViewModelIn.TypeReport = 1;
            reportViewModelIn.ReportContent = "Test content";

            //act
            ReportViewModelOut report = new ReportViewModelOut();
            try
            {
                report = ReportService.Instance.CreateReport(reportViewModelIn);
            }
            catch (Exception ex)
            {
                Assert.IsTrue(ex.Message.Length > 0);
            }
        }

        [TestMethod]
        public void GetAllReportToAccount_ShouldReturnListReport()
        {
            //arrange
            int accountId = 7;

            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReportToAccount(accountId);

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }
        [TestMethod]
        public void GetAllReportToAccount_ShouldReturnList()
        {
            //arrange
            int accountId = 7;

            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReportToAccount(accountId);

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }

        [TestMethod]
        public void GetAllReportToPost_ShouldReturnListReport()
        {
            //arrange
            int postId = 78;

            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReportToPost(postId);

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }
        [TestMethod]
        public void GetAllReportToPost_ShouldReturnList()
        {
            //arrange
            int postId = 78;

            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReportToPost(postId);

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }

        [TestMethod]
        public void GetAllReportToComment_ShouldReturnListReport()
        {
            //arrange
            int commentId = 1;

            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReportToComment(1);

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }

        [TestMethod]
        public void GetAllReportPost_ShouldReturnListReport()
        {
            //arrange
            int postId = 1;

            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReportPost();

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }

        [TestMethod]
        public void GetAllReportUser_ShouldReturnListReport()
        {
            //arrange
            int userId = 1;

            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReportUser();

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }

        [TestMethod]
        public void GetAllReportComment_ShouldReturnListReport()
        {
            //arrange
            int commentId = 1;

            //act
            ReportViewModelOut report = ReportService.Instance.GetAllReportComment();

            //assert
            Assert.AreEqual(report.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(report.ListReport.Count >= 0);
        }

    }
}
