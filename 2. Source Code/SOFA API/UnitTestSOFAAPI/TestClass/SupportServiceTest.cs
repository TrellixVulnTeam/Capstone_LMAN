using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Support;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class SupportServiceTest
    {
        [TestMethod]
        public void CreateSupportRequest_ShouldReturnSuccessfullyCode()
        {
            //arrange
            SupportRequestViewModelIn request = new SupportRequestViewModelIn();
            request.RequestType = Const.SUPPORT_TYPE_FASHIONISTA;
            request.UserRequestId = 4;
            request.TimeCreate = DateTime.Now.ToString();
            request.Status = 2;
            request.Respone = "";
            //act
            SupportRequestViewModelOut modelOut = SupportService.Instance.CreateSupportRequest(request);

            //assert
            Assert.AreEqual(modelOut.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.AreEqual(modelOut.UserRequestId, request.UserRequestId);
        }

        [TestMethod]
        public void GetSupportRequest_ShouldReturnSuccessfullyCode_IfUserIDExist()
        {
            //arrange
            SupportRequestViewModelIn request = new SupportRequestViewModelIn();
            request.RequestType = Const.SUPPORT_TYPE_FASHIONISTA;
            request.UserRequestId = 4;
            request.TimeCreate = DateTime.Now.ToString();
            request.Status = 2;
            request.Respone = "";

            //act
            SupportRequestViewModelOut modelOut = SupportService.Instance.GetSupportRequest(request.UserRequestId, request.RequestType);

            //assert
            Assert.AreEqual(modelOut.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.AreEqual(modelOut.UserRequestId, request.UserRequestId);
        }

        [TestMethod]
        public void GetSupportRequest_ShouldReturnSuccessfullyCode_IfUserIdExist()
        {
            //arrange
            SupportRequestViewModelIn request = new SupportRequestViewModelIn();
            request.RequestType = Const.SUPPORT_TYPE_FASHIONISTA;
            request.UserRequestId = 4;
            request.TimeCreate = DateTime.Now.ToString();
            request.Status = 2;
            request.Respone = "";

            //act
            SupportRequestViewModelOut modelOut = SupportService.Instance.GetSupportRequest(request.UserRequestId, request.RequestType);

            //assert
            Assert.AreEqual(modelOut.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.AreEqual(modelOut.UserRequestId, request.UserRequestId);
        }

        [TestMethod]
        public void CheckFashionista_ShouldReturnFalseFashionista_IfUserIsNotFashionista()
        {
            //arrange
            SupportRequestViewModelIn request = new SupportRequestViewModelIn();
            request.RequestType = Const.SUPPORT_TYPE_FASHIONISTA;
            request.UserRequestId = 4;
            request.TimeCreate = DateTime.Now.ToString();
            request.Status = 2;
            request.Respone = "";

            //act
            SupportRequestViewModelOut modelOut = SupportService.Instance.CheckFashionista(request.UserRequestId);

            //assert
            Assert.AreEqual(modelOut.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsFalse(modelOut.isFashionista);
        }

        [TestMethod]
        public void GetAllUserSupportRequest_ShouldReturnUserSupportList()
        {
            //arrange

            //act
            DetailUserSupportModelOut modelOut = SupportService.Instance.GetAllUserSupportRequest();

            //assert
            Assert.AreEqual(modelOut.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(modelOut.ListUserSupport.Count >=0);
        }

        [TestMethod]
        public void SetUserFashionistaRequest_ShouldReturnUserSupportList()
        {
            //arrange

            //act
            DetailUserSupportModelOut modelOut = SupportService.Instance.GetAllUserSupportRequest();

            //assert
            Assert.AreEqual(modelOut.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(modelOut.ListUserSupport.Count >= 0);
        }
        [TestMethod]
        public void SetUserLockAccountRequest_ShouldReturnUserSupportList()
        {
            //arrange

            //act
            DetailUserSupportModelOut modelOut = SupportService.Instance.GetAllUserSupportRequest();

            //assert
            Assert.AreEqual(modelOut.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(modelOut.ListUserSupport.Count >= 0);
        }

        [TestMethod]
        public void RejectSupportRequest_ShouldReturnUserSupportList()
        {
            //arrange

            //act
            DetailUserSupportModelOut modelOut = SupportService.Instance.GetAllUserSupportRequest();

            //assert
            Assert.AreEqual(modelOut.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(modelOut.ListUserSupport.Count >= 0);
        }
    }
}
