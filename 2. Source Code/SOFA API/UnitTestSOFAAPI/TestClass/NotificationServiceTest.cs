using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Notification;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class NotificationServiceTest
    {
        [TestMethod]
        public void GetNotificationByToAccount_ShouldReturnListNotification_IfToAccountIdExist()
        {
            // arrange
            int toAccountId = 13;
            int page = 1;
            int rowOfPage = 5;

            // act
            var result = NotificationService.Instance.GetNotificationByToAccount(toAccountId, page, rowOfPage);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListNoti.Count > 0);
        }

        [TestMethod]
        public void GetNotificationByToAccount_ShouldReturnEmptyList_IfToAccountIdNotExist()
        {
            // arrange
            int toAccountId = -1;
            int page = 1;
            int rowOfPage = 5;

            // act
            var result = NotificationService.Instance.GetNotificationByToAccount(toAccountId, page, rowOfPage);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListNoti.Count == 0);
        }

        [TestMethod]
        public void GetUnreadNotificationByToAccount_ShouldReturnListNotification_IfToAccountIdExist()
        {
            // arrange
            int toAccountId = 13;
            int page = 1;
            int rowOfPage = 5;

            // act
            var result = NotificationService.Instance.GetUnreadNotificationByToAccount(toAccountId, page, rowOfPage);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListNoti.Count > 0);
        }

        [TestMethod]
        public void GetUnreadNotificationByToAccount_ShouldReturnEmptyList_IfToAccountIdNotExist()
        {
            // arrange
            int toAccountId = -1;
            int page = 1;
            int rowOfPage = 5;

            // act
            var result = NotificationService.Instance.GetUnreadNotificationByToAccount(toAccountId, page, rowOfPage);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListNoti.Count == 0);
        }
        [TestMethod]
        public void CreatedNotification_ShouldReturnSuccessfullyCode_IfValidInput()
        {
            // arrange
            NotificationViewModelIn modelIn = new NotificationViewModelIn(1, 78, 13);

            // act
            var result = NotificationService.Instance.CreatedNotification(modelIn);

            // Assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(modelIn.PostId, result.PostId);
        }

        [TestMethod]
        public void CreatedNotificationFollow_ShouldReturnSuccessfullyCode_IfValidInput()
        {
            // arrange
            NotificationViewModelIn modelIn = new NotificationViewModelIn(13, 7);

            // act
            var result = NotificationService.Instance.CreatedNotificationFollow(modelIn);

            // Assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(modelIn.FromAccount, result.FromAccount);
            Assert.AreEqual(modelIn.ToAccount, result.ToAccount);
        }

        [TestMethod]
        public void SetReadNotificationById_ShouldReturnSuccessfullyCode_IfNotificationIdExist()
        {
            // arange
            int notificationId = 407;

            // act
            var result = NotificationService.Instance.SetReadNotificationById(notificationId);

            // Assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void SetReadNotificationById_ShouldReturnFalse_IfNotificationIdNotExist()
        {
            // arange
            int notificationId = -1;

            // act
            var result = NotificationService.Instance.SetReadNotificationById(notificationId);

            // Assert
            Assert.AreEqual(Const.REQUEST_CODE_FAILED, result.Code);
            Assert.AreEqual("Can't update Notification", result.ErrorMessage);
        }

        [TestMethod]
        public void MarkAllIsRead_ShouldReturnSuccessfullyCode_IfAcountIdExist()
        {
            // arange
            int accountId = 7;

            // act
            var result = NotificationService.Instance.MarkAllAsRead(accountId);

            // Assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void MarkAllIsRead_ShouldReturnFalse_IfAcountIdNotExist()
        {
            // arange
            int accountId = -1;

            // act
            var result = NotificationService.Instance.MarkAllAsRead(accountId);

            // Assert
            Assert.AreEqual(Const.REQUEST_CODE_FAILED, result.Code);
        }

        [TestMethod]
        public void AddNewNotificationFeedback_ShouldReturnSuccessfullyCode_IfValidInput()
        {
            // arrange
            int feedbackId = 17;
            int toAccountId = 13;

            // act
            var result = NotificationService.Instance.AddNewNotificationFeedback(feedbackId, toAccountId);

            // Assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }
    }
}
