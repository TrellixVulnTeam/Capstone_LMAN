using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class MessageServiceTest
    {
        [TestMethod]
        public void GetMessageByConversationId_ShouldReturnListMessage_IfConversationIdExist()
        {
            // arrange
            int conversationId = 1;

            // arrange 
            var result = MessageService.Instance.GetMessageByConversationId(conversationId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListMess.Count > 0);
        }
        [TestMethod]
        public void GetMessageByConversationId_ShouldReturnListMessage_IfIdExist()
        {
            // arrange
            int conversationId = 2;

            // arrange 
            var result = MessageService.Instance.GetMessageByConversationId(conversationId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListMess.Count > 0);
        }

        [TestMethod]
        public void GetMessageByConversationId_ShouldReturnEmptyList_IfConversationIdNotExist()
        {
            // arrange
            int conversationId = -1;

            // arrange 
            var result = MessageService.Instance.GetMessageByConversationId(conversationId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListMess.Count == 0);
        }
        [TestMethod]
        public void GetMessageByConversationId_ShouldReturnEmptyListMessage_IfConversationIdNotExist()
        {
            // arrange
            int conversationId = -2;

            // arrange 
            var result = MessageService.Instance.GetMessageByConversationId(conversationId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListMess.Count == 0);
        }

        [TestMethod]
        public void GetMessageBySenderAndReceiverId_ShouldReturnListMessage_IfValidInput()
        {
            // arrange
            int senderId = 19;
            int receiverId = 7;

            // arrange 
            var result = MessageService.Instance.GetMessageBySenderAndReceiverId(senderId, receiverId, 1, 5);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListMess.Count > 0);
        }

        [TestMethod]
        public void GetMessageBySenderAndReceiverId_ShouldReturnEmptyList_IfInvalidInput()
        {
            // arrange
            int senderId = 7;
            int receiverId = 19;

            // arrange 
            var result = MessageService.Instance.GetMessageBySenderAndReceiverId(senderId, receiverId, 1, 5);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListMess.Count == 0);
        }

        [TestMethod]
        public void SetDeleteFlagForMessage_ShouldReturnSuccessfullyCode_IfMessageIdExist()
        {
            // arrange
            int messageId = 20;
            bool isSenderDelete = true;

            // arrange 
            var result = MessageService.Instance.SetDeleteFlagForMessage(messageId, isSenderDelete);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void SetDeleteFlagForMessage_ShouldReturnFail_IfMessageIdNotExist()
        {
            // arrange
            int messageId = -1;
            bool isSenderDelete = true;

            // arrange 
            var result = MessageService.Instance.SetDeleteFlagForMessage(messageId, isSenderDelete);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_FAILED, result.Code);
        }
    }
}
