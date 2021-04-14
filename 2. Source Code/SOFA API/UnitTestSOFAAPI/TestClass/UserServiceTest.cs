using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
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

            var mockUserService = new Mock<VirtualUserService>();
            mockUserService.Setup(m => m.GetAllUser()).Returns(mockListUsers);

            Assert.AreEqual(mockListUsers.ListUser.Count, mockUserService.Object.GetAllUser().ListUser.Count);
        }

        [TestMethod]
        public void GetAllUser_ShouldReturnEmptyList_IfHaveNoUser()
        {
            AdminAccountViewModelOut mockListUsers = new AdminAccountViewModelOut();

            var mockUserService = new Mock<VirtualUserService>();
            mockUserService.Setup(m => m.GetAllUser()).Returns(mockListUsers);

            Assert.AreEqual(0, mockUserService.Object.GetAllUser().ListUser.Count);
        }
    }
}
