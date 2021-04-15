using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class ConversationServiceTest
    {
        [TestMethod]
        public void getListConversation_ShouldReturnListConversation_IfAccountIdExist()
        {
            // arrange 
            int accountId = 7;
            int numberOfConversation = 2;

            // Act
            var result = ConversationService.Instance.getListConversation(accountId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfConversation, result.listConversation.Count);
        }

        [TestMethod]
        public void getListConversation_ShouldReturnEmptyList_IfAccountIdNotExist()
        {
            // arrange 
            int accountId = -1;
            int numberOfConversation = 0;

            // Act
            var result = ConversationService.Instance.getListConversation(accountId);

            // assert
            Assert.AreEqual(0, result.AccountId);
            Assert.AreEqual(numberOfConversation, result.listConversation.Count);
        }

        [TestMethod]
        public void SearchConversation_ShouldReturnListOfConversation_IfAccountIdAndKeySearchExist()
        {
            // arrange
            int accountId = 7;
            string keySearch = "Deptrai";
            int numberOfConversation = 1;

            // Act
            var result = ConversationService.Instance.SearchConversation(accountId, keySearch);

            // Assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfConversation, result.listSearch.Count);
        }

        [TestMethod]
        public void SearchConversation_ShouldReturnEmptyList_IfAccountIdAndKeySearchNotExist()
        {
            // arrange
            int accountId = 7;
            string keySearch = "bbbbbbbbbbb";

            // Act
            var result = ConversationService.Instance.SearchConversation(accountId, keySearch);

            // Assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(null, result.listSearch);
        }
    }
}
