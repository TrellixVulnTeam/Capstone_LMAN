using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Info;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class InfoServiceTest
    {
        [TestMethod]
        public void GetAllInfor_ShouldReturnListOfInfor()
        {
            // arrange

            // Act
            var result = InfoService.Instance.GetAllInfo();

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListInfo.Count > 0);
        }

        [TestMethod]
        public void GetAllInfor_ShouldReturnListOfInfor_IfInforExist()
        {
            // arrange

            // Act
            var result = InfoService.Instance.GetAllInfo();

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListInfo.Count > 0);
        }

        [TestMethod]
        public void getUserInfor_ShouldReturnListOfUserInfo_IfUsernameExist()
        {
            // arrang
            int userId = 7;

            // act
            var result = InfoService.Instance.GetUserInfo(userId);

            // assert 
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListInfo.Count > 0);
        }
        [TestMethod]
        public void getUserInfor_ShouldReturnListOfUserInfo_IfIdExist()
        {
            // arrang
            int userId = 7;

            // act
            var result = InfoService.Instance.GetUserInfo(userId);

            // assert 
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListInfo.Count > 0);
        }

        [TestMethod]
        public void getUserInfor_ShouldReturnEmptyList_IfUsernameExist()
        {
            // arrang
            int userId = -1;

            // act
            var result = InfoService.Instance.GetUserInfo(userId);

            // assert 
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListInfo.Count == 0);
        }
        [TestMethod]
        public void getUserInfor_ShouldReturnEmptyList_IfUsernameNotExist()
        {
            // arrang
            int userId = -2;

            // act
            var result = InfoService.Instance.GetUserInfo(userId);

            // assert 
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListInfo.Count == 0);
        }

        [TestMethod]
        public void CreateInfor_ShouldReturnSuccesfullyCode_InputValid()
        {
            // arrang
            InfoViewModelIn modelIn = new InfoViewModelIn(4, 170, 60, 90, 60, 90, 1, "test");

            // act
            var result = InfoService.Instance.CreateInfo(modelIn);

            // assert 
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListInfo.Count > 0);
        }
        [TestMethod]
        public void CreateInfor_ShouldReturnSuccesfullyCode_ValidInput()
        {
            // arrang
            InfoViewModelIn modelIn = new InfoViewModelIn(4, 169, 61, 91, 61, 92, 1, "test");

            // act
            var result = InfoService.Instance.CreateInfo(modelIn);

            // assert 
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListInfo.Count > 0);
        }
    }
}
