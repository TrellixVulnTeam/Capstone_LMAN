using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Newsfeed;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class MarkupServiceTest
    {
        [TestMethod]
        public void AddMarkedPost_ShouldReturnSuccessfullyCode_IfValidInput()
        {
            // arrange
            int postId = 78;
            int accountId = 7;

            //act 
            var result = MarkupService.Instance.AddMarkedPost(postId, accountId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListMarkup.Count > 0);
        }

        [TestMethod]
        public void UnMarkedPost_ShouldReturnSuccessfullyCode_IfValidInput()
        {
            // arrange
            int postId = 78;
            int accountId = 7;

            //act 
            var result = MarkupService.Instance.UnmarkedPost(postId, accountId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListMarkup.Count > 0);
        }

        [TestMethod]
        public void GetUserMarkupPost_ShouldReturnSuccessfullyCode_IfValidInput()
        {
            // arrange
            int userId = 20;
            int page = 1;
            int rowOfPage = 5;
            var result = new PostViewModelOut();
            try
            {
                result = MarkupService.Instance.GetUserMarkupPost(userId, page, rowOfPage);
            }
            catch (Exception ex)
            {
                // assert
                Assert.IsTrue(ex.Message.Length > 0);
            }
        }
        [TestMethod]
        public void GetUserMarkupPost_ShouldReturnSuccessfullyCode_IfValidUserId()
        {
            // arrange
            int userId = 20;
            int page = 1;
            int rowOfPage = 5;
            var result = new PostViewModelOut();
            try
            {
                result = MarkupService.Instance.GetUserMarkupPost(userId, page, rowOfPage);
            }
            catch (Exception ex)
            {
                // assert
                Assert.IsTrue(ex.Message.Length > 0);
            }
        }

        [TestMethod]
        public void GetUserMarkupPost_ShouldReturnZeroe_IfUserIdNotExist()
        {
            // arrange
            int userId = -1;
            int page = 1;
            int rowOfPage = 5;

            //act 
            var result = MarkupService.Instance.GetUserMarkupPost(userId, page, rowOfPage);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListPost.Count == 0);
        }

        [TestMethod]
        public void GetAllMarkupPost_ShouldReturnSuccessfullyCodeWithListOfMarkup_IfValidInput()
        {
            // arrange
            int page = 1;
            int rowOfPage = 5;

            //act 
            var result = MarkupService.Instance.GetAllMarkupPost(50, page, rowOfPage);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListPost.Count > 0);
        }
    }
}
