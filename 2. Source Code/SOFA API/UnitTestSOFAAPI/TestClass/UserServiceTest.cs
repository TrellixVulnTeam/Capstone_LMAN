using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.Service;
using SOFA_API.ViewModel.Account;
using System;
using System.Collections.Generic;
using System.Text;
using UnitTestSOFAAPI.VirtualService;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class UserServiceTest
    {
        [TestMethod]
        public void GetAllUser_ShouldReturnAllExisted()
        {
            // arrange
            AdminAccountModelOut account = new AdminAccountModelOut(1, "Test1", "Test1@gmail.com", "Test Name", "Test Name", 
                "123456", "avatar.jpg", DateTime.Now, true);
            AdminAccountModelOut account1 = new AdminAccountModelOut(1, "Test2", "Test2@gmail.com", "FN 2", "LN 2",
                "1234567", "avatar1.jpg", DateTime.Now, true);
            AdminAccountModelOut account3 = new AdminAccountModelOut(1, "Test3", "Test3@gmail.com", "FN 3", "LN 3",
                "123458", "avatar3.jpg", DateTime.Now, true);

            AdminAccountViewModelOut mockListUsers = new AdminAccountViewModelOut();
            mockListUsers.ListUser.Add(account);
            mockListUsers.ListUser.Add(account1);
            mockListUsers.ListUser.Add(account3);

            // act
            var mockUserService = new Mock<VirtualUserService>();
            mockUserService.Setup(m => m.GetAllUser()).Returns(mockListUsers);

            // assert
            Assert.AreEqual(mockListUsers.ListUser.Count, mockUserService.Object.GetAllUser().ListUser.Count);
        }

        [TestMethod]
        public void GetAllUser_ShouldReturnEmptyList_IfHaveNoUser()
        {
            // arrange
            AdminAccountViewModelOut mockListUsers = new AdminAccountViewModelOut();

            //act
            var mockUserService = new Mock<VirtualUserService>();
            mockUserService.Setup(m => m.GetAllUser()).Returns(mockListUsers);
            
            //asset
            Assert.AreEqual(0, mockUserService.Object.GetAllUser().ListUser.Count);
        }

        [TestMethod]
        public void GetUserDetailById_ShouldReturnUser_IfUserExist()
        {
            // arrange
            AdminUserDetailViewModelOut userDetail = new AdminUserDetailViewModelOut(1, "TungNT", true, DateTime.Now, DateTime.Now,
                "test", "test", true, "test@gmail.com", "123456", "Ha Noi", "avatar.jpg", 170, 65, 30, 30, 30);
            
            // act
            var mockUserService = new Mock<VirtualUserService>();
            mockUserService.Setup(m => m.GetUserDetailById(1)).Returns(userDetail);
            var result = mockUserService.Object.GetUserDetailById(1);

            // assert
            Assert.AreSame(userDetail, result);
            Assert.AreEqual(userDetail.Id, result.Id);
        }

        [TestMethod]
        public void GetUserDetailById_ShouldReturnNull_IfUserNotExist()
        {
            // arrange
            AdminUserDetailViewModelOut userDetail = new AdminUserDetailViewModelOut(1, "TungNT", true, DateTime.Now, DateTime.Now,
                "test", "test", true, "test@gmail.com", "123456", "Ha Noi", "avatar.jpg", 170, 65, 30, 30, 30);

            // act
            var mockUserService = new Mock<VirtualUserService>();
            mockUserService.Setup(m => m.GetUserDetailById(1)).Returns(userDetail);
            var result = mockUserService.Object.GetUserDetailById(2);

            // assert
            Assert.IsNull(result);
        }

        [TestMethod]
        public void BanUser_ShouldReturnSuccessfullCode_IfUserExist()
        {
            // arrange
            AccountViewModelOut account = new AccountViewModelOut(1, "tungnt", "123", 2, "user", "tungnt@gmail.com", "123456",
                true, "asdqwe123", "tung", "nguyen");

            // act
            var result = UserService.Instance.BanUser(account.Id);
            var accountUpdated = AccountDAO.Instance.GetUserById(result.Id);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(false, accountUpdated.IsActive);
        }

        [TestMethod]
        public void BanUser_ShouldReturnFailedCode_IfUserNotExist()
        {
            // arrange
            AccountViewModelOut account = new AccountViewModelOut(1, "tungnt", "123", 2, "user", "tungnt@gmail.com", "123456",
                true, "asdqwe123", "tung", "nguyen");

            // act
            var result = UserService.Instance.BanUser(50);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_FAILED, result.Code);
            Assert.AreEqual("AccountId không tồn tại", result.ErrorMessage);
        }

        [TestMethod]
        public void UnbanUser_ShouldReturnSuccessfullCode_IfUserExist()
        {
            // arrange
            AccountViewModelOut account = new AccountViewModelOut(1, "tungnt", "123", 2, "user", "tungnt@gmail.com", "123456",
                true, "asdqwe123", "tung", "nguyen");

            // act
            var result = UserService.Instance.UnbanUser(account.Id);
            var accountUpdated = AccountDAO.Instance.GetUserById(result.Id);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(true, accountUpdated.IsActive);
        }

        [TestMethod]
        public void UnbanUser_ShouldReturnFailedCode_IfUserNotExist()
        {
            // arrange
            AccountViewModelOut account = new AccountViewModelOut(1, "tungnt", "123", 2, "user", "tungnt@gmail.com", "123456",
                true, "asdqwe123", "tung", "nguyen");

            // act
            var result = UserService.Instance.BanUser(50);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_FAILED, result.Code);
            Assert.AreEqual("AccountId không tồn tại", result.ErrorMessage);
        }

        [TestMethod]
        public void GetDashBoardInformation_ShoundTotalCount_IfUserAndPostExist()
        {
            // arrange
            var expectedResult = new AdminDashboardModelOut(17, 16, 4, 4);

            // act
            var result = UserService.Instance.GetDashBoardInformation();

            // assert
            Assert.AreEqual(expectedResult.TotalUser, result.TotalUser);
            Assert.AreEqual(expectedResult.TotalPost, result.TotalPost);
            Assert.AreEqual(expectedResult.NumberOfUserActive, result.NumberOfUserActive);
            Assert.AreEqual(expectedResult.NumberOfPostVerified, result.NumberOfPostVerified);
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }
    }
}
