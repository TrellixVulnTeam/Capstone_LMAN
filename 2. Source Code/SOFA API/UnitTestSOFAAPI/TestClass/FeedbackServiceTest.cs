using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Feedback;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class FeedbackServiceTest
    {
        [TestMethod]
        public void CreateNewFeedback_ShouldReturnSucccessfullCode_IfInputMatch()
        {
            // arrange
            FeedbackViewModelIn modelIn = new FeedbackViewModelIn("Test Feedback", "Content feedback day", 7,
                DateTime.Now.ToString(), 2);

            // Act 
            var result = FeedbackService.Instance.CreateNewFeedback(modelIn);

            // Assert 
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(modelIn.UserFeedbackId, result.UserFeedbackId);
        }

        [TestMethod]
        public void GetListFeedback_ShouldReturnListOfUserFeedback_IfUserIdExist()
        {
            // arrange
            int userId = 7;

            // Act
            var result = FeedbackService.Instance.GetListFeedback(userId);

            // arrang
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListFeedback.Count > 0);
        }

        [TestMethod]
        public void GetListFeedback_ShouldReturnListOfUserFeedback()
        {
            // arrange
            int userId = 7;

            // Act
            var result = FeedbackService.Instance.GetListFeedback(userId);

            // arrang
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListFeedback.Count > 0);
        }

        [TestMethod]
        public void GetListFeedback_ShouldReturnEmptyList_IfUserIdNotExist()
        {
            // arrange
            int userId = -2;
            int numberOfFeedback = 0;

            // Act
            var result = FeedbackService.Instance.GetListFeedback(userId);

            // arrang
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfFeedback, result.ListFeedback.Count);
        }

        [TestMethod]
        public void GetListFeedback_ShouldReturnEmptyList_IfIdNotExist()
        {
            // arrange
            int userId = -3;
            int numberOfFeedback = 0;

            // Act
            var result = FeedbackService.Instance.GetListFeedback(userId);

            // arrang
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfFeedback, result.ListFeedback.Count);
        }

        [TestMethod]
        public void GetFeedbackById_ShouldReturnListOfUserFeedback_IfUserIdExist()
        {
            // arrange
            int userId = 7;
            int numberOfFeedback = 2;

            // Act
            var result = FeedbackService.Instance.GetListFeedback(userId);

            // arrang
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfFeedback, result.ListFeedback.Count);
        }

        [TestMethod]
        public void GetFeedbackById_ShouldReturnListOfUserFeedback()
        {
            // arrange
            int userId = 7;
            int numberOfFeedback = 2;

            // Act
            var result = FeedbackService.Instance.GetListFeedback(userId);

            // arrang
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfFeedback, result.ListFeedback.Count);
        }

        [TestMethod]
        public void GetFeedbackById_ShouldReturnEmptyList_IfUserIdNotHaveFeedback()
        {
            // arrange
            int userId = 4;
            int numberOfFeedback = 0;

            // Act
            var result = FeedbackService.Instance.GetListFeedback(userId);

            // arrang
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfFeedback, result.ListFeedback.Count);
        }

        [TestMethod]
        public void GetFeedbackById_ShouldReturnEmptyList_IfUserIdNotFeedback()
        {
            // arrange
            int userId = 4;
            int numberOfFeedback = 0;

            // Act
            var result = FeedbackService.Instance.GetListFeedback(userId);

            // arrang
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfFeedback, result.ListFeedback.Count);
        }

        [TestMethod]
        public void GetFeedbackById_ShouldReturnEmptyList_IfUserIdNotExist()
        {
            // arrange
            int userId = -3;
            int numberOfFeedback = 0;

            // Act
            var result = FeedbackService.Instance.GetListFeedback(userId);

            // arrang
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfFeedback, result.ListFeedback.Count);
        }

        [TestMethod]
        public void GetFeedbackById_ShouldReturnEmptyList_IfIdNotExist()
        {
            // arrange
            int userId = -3;
            int numberOfFeedback = 0;

            // Act
            var result = FeedbackService.Instance.GetListFeedback(userId);

            // arrang
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfFeedback, result.ListFeedback.Count);
        }

        [TestMethod]
        public void GetAllFeedBack_ShouldReturnListOfAllFeedback()
        {
            // arrange

            // Act
            var result = FeedbackService.Instance.GetAllFeedback();

            // Assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListFeedback.Count > 0);
        }

        [TestMethod]
        public void ProcessFeedback_ShouldReturnSuccessfullyCode_IfValidInfor()
        {
            // arrange
            int feedbackId = 14;

            // act
            var result = FeedbackService.Instance.ProcessFeedback(feedbackId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void ProcessFeedback_ShouldReturnFail_IfValidFeedbackId()
        {
            // arrange
            int feedbackId = -1;

            // act
            var result = FeedbackService.Instance.ProcessFeedback(feedbackId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_FAILED, result.Code);
        }
    }
}
