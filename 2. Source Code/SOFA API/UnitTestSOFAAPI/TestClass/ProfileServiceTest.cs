using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Profile;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class ProfileServiceTest
    {
        [TestMethod]
        public void GetProfileModelByAccountID_ShouldReturnAccount_IfIdExist()
        {
            //arrange
            int accountID = 5;

            //act
            ProfileViewModelOut profile = ProfileService.Instance.GetProfileModelByAccountID(accountID);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.AreEqual(accountID, profile.AccountID);
        }
        [TestMethod]
        public void GetProfileModelByAccountID_ShouldReturnSuccesfullyCode_IfIdExist()
        {
            //arrange
            int accountID = 5;

            //act
            ProfileViewModelOut profile = ProfileService.Instance.GetProfileModelByAccountID(accountID);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.AreEqual(accountID, profile.AccountID);
        }

        [TestMethod]
        public void GetProfileModelByAccountID_ShouldReturnEmptyObject_IfIdNotExist()
        {
            //arrange
            int accountID = -1;

            //act
            ProfileViewModelOut profile = ProfileService.Instance.GetProfileModelByAccountID(accountID);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_FAILED);
            Assert.AreNotEqual(accountID, profile.AccountID);
        }
        [TestMethod]
        public void GetProfileModelByAccountID_ShouldReturnEmpty_IfIdNotExist()
        {
            //arrange
            int accountID = -2;

            //act
            ProfileViewModelOut profile = ProfileService.Instance.GetProfileModelByAccountID(accountID);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_FAILED);
            Assert.AreNotEqual(accountID, profile.AccountID);
        }

        [TestMethod]
        public void SearchUserByName_ShouldReturnProfileList_IfnameExist()
        {
            //arrange
            string accountName = "văn";

            //act
            ProfileListUserViewModelOut profile = ProfileService.Instance.SearchUserByName(0, accountName, 1, 5);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(profile.ListProfile.Count > 0);
        }
        [TestMethod]
        public void SearchUserByName_ShouldReturnProfileList_IfNameExist()
        {
            //arrange
            string accountName = "viên";

            //act
            ProfileListUserViewModelOut profile = ProfileService.Instance.SearchUserByName(0, accountName, 1, 5);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(profile.ListProfile.Count > 0);
        }
        [TestMethod]
        public void SearchUserByName_ShouldReturnProfile_IfNameExist()
        {
            //arrange
            string accountName = "Nguyễn";

            //act
            ProfileListUserViewModelOut profile = ProfileService.Instance.SearchUserByName(0, accountName, 1, 5);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(profile.ListProfile.Count > 0);
        }

        [TestMethod]
        public void SearchUserByName_ShouldReturnEmptyProfileList_IfNameNotExist()
        {
            //arrange
            string accountName = "Trump";

            //act
            ProfileListUserViewModelOut profile = ProfileService.Instance.SearchUserByName(0, accountName, 1, 5);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(profile.ListProfile.Count == 0);
        }
        [TestMethod]
        public void SearchUserByName_ShouldReturnEmptyProfile_IfNameNotExist()
        {
            //arrange
            string accountName = "Biden";

            //act
            ProfileListUserViewModelOut profile = ProfileService.Instance.SearchUserByName(0, accountName, 1, 5);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(profile.ListProfile.Count == 0);
        }

        [TestMethod]
        public void UpdateProfileByAccountID_ShouldReturnSuccessfullyCode_IfValidInforExist()
        {
            //arrange
            ProfileViewModelIn modelIn = new ProfileViewModelIn();
            modelIn.AccountID = 4;
            modelIn.FirstName = "Thảo";
            modelIn.LastName = "Việt Dũng";
            modelIn.Gender = true;
            modelIn.DOB = DateTime.Now;
            modelIn.Email = "vank48dhv@gmail.com";
            modelIn.Phone = "0942561863";
            modelIn.Address = "Hà Nam";

            //act
            ProfileViewModelOut profile = ProfileService.Instance.UpdateProfileByAccountID(modelIn.AccountID, modelIn);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_SUCCESSFULLY);
        }
        [TestMethod]
        public void UpdateProfileByAccountId_ShouldReturnSuccessfullyCode_IfValidInforExist()
        {
            //arrange
            ProfileViewModelIn modelIn = new ProfileViewModelIn();
            modelIn.AccountID = 4;
            modelIn.FirstName = "Thảo";
            modelIn.LastName = "Việt Dũng";
            modelIn.Gender = true;
            modelIn.DOB = DateTime.Now;
            modelIn.Email = "vank48dhv@gmail.com";
            modelIn.Phone = "0942561863";
            modelIn.Address = "Hà Nam Cốc";

            //act
            ProfileViewModelOut profile = ProfileService.Instance.UpdateProfileByAccountID(modelIn.AccountID, modelIn);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_SUCCESSFULLY);
        }

        [TestMethod]
        public void UpdateProfileByAccountId_ShouldReturnSuccessfullyCode_IfValidInfoExist()
        {
            //arrange
            ProfileViewModelIn modelIn = new ProfileViewModelIn();
            modelIn.AccountID = 4;
            modelIn.FirstName = "Thảo";
            modelIn.LastName = "Việt Dũng";
            modelIn.Gender = true;
            modelIn.DOB = DateTime.Now;
            modelIn.Email = "vank48dhv@gmail.com";
            modelIn.Phone = "0942561863";
            modelIn.Address = "Hà Nam Lý";

            //act
            ProfileViewModelOut profile = ProfileService.Instance.UpdateProfileByAccountID(modelIn.AccountID, modelIn);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_SUCCESSFULLY);
        }

        [TestMethod]
        public void UpdateProfileByAccountID_ShouldReturnFail_IfMissingFirstname()
        {
            //arrange
            ProfileViewModelIn modelIn = new ProfileViewModelIn();
            modelIn.AccountID = 4;
            modelIn.FirstName = "";
            modelIn.LastName = "Việt Dũng";
            modelIn.Gender = true;
            modelIn.DOB = DateTime.Now;
            modelIn.Email = "vank48dhv@gmail.com";
            modelIn.Phone = "0942561863";
            modelIn.Address = "Hà Nam";

            //act
            ProfileViewModelOut profile = ProfileService.Instance.UpdateProfileByAccountID(modelIn.AccountID, modelIn);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_FAILED);
        }
        [TestMethod]
        public void UpdateProfileByAccountID_ShouldReturnFail_IfMissingLastname()
        {
            //arrange
            ProfileViewModelIn modelIn = new ProfileViewModelIn();
            modelIn.AccountID = 4;
            modelIn.FirstName = "Thao";
            modelIn.LastName = "";
            modelIn.Gender = true;
            modelIn.DOB = DateTime.Now;
            modelIn.Email = "vank48dhv@gmail.com";
            modelIn.Phone = "0942561863";
            modelIn.Address = "Hà Nam";

            //act
            ProfileViewModelOut profile = ProfileService.Instance.UpdateProfileByAccountID(modelIn.AccountID, modelIn);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_FAILED);
        }

        [TestMethod]
        public void UpdateProfileByAccountID_ShouldReturnFail_IfMissingPhone()
        {
            //arrange
            ProfileViewModelIn modelIn = new ProfileViewModelIn();
            modelIn.AccountID = 4;
            modelIn.FirstName = "Thao";
            modelIn.LastName = "Dung";
            modelIn.Gender = true;
            modelIn.DOB = DateTime.Now;
            modelIn.Email = "vank48dhv@gmail.com";
            modelIn.Phone = "";
            modelIn.Address = "Hà Nam";

            //act
            ProfileViewModelOut profile = ProfileService.Instance.UpdateProfileByAccountID(modelIn.AccountID, modelIn);

            //assert
            Assert.AreEqual(profile.Code, Const.REQUEST_CODE_FAILED);
        }
    }
}
