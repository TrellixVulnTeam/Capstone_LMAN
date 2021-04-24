using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class FollowServiceTest
    {
        [TestMethod]
        public void GetFollowerNumber_ShouldReturnNumberOfFollow_IfUserIdExist()
        {
            // arrange 
            int userId = 4;
            int followerNumber = 5;

            // act
            var result = FollowService.Instance.GetFollowerNumber(userId);

            // assert
            Assert.AreEqual(followerNumber, result.FollowerNumber);
        }

        [TestMethod]
        public void GetFollowerNumber_ShouldReturnFollowNumber_IfUserIdExist()
        {
            // arrange 
            int userId = 4;
            int followerNumber = 5;

            // act
            var result = FollowService.Instance.GetFollowerNumber(userId);

            // assert
            Assert.AreEqual(followerNumber, result.FollowerNumber);
        }
        [TestMethod]
        public void GetFollowerNumber_ShouldReturnZero_IfUserIdNotExist()
        {
            // arrange 
            int userId = -1;
            int followerNumber = 0;

            // act
            var result = FollowService.Instance.GetFollowerNumber(userId);

            // assert
            Assert.AreEqual(followerNumber, result.FollowerNumber);
        }

        [TestMethod]
        public void GetFollowerNumber_ShouldEmpty_IfUserIdNotExist()
        {
            // arrange 
            int userId = -2;
            int followerNumber = 0;

            // act
            var result = FollowService.Instance.GetFollowerNumber(userId);

            // assert
            Assert.AreEqual(followerNumber, result.FollowerNumber);
        }

        [TestMethod]
        public void GetFollowerList_ShouldReturnListOfFollower_IfIdExist()
        {
            int userId = 4;
            int numberOfFollower = 5;

            // act 
            var result = FollowService.Instance.GetFollowerList(userId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfFollower, result.ListFollower.Count);
        }

        [TestMethod]
        public void GetFollowerList_ShouldReturnListOfFollower()
        {
            int userId = 4;
            int numberOfFollower = 5;

            // act 
            var result = FollowService.Instance.GetFollowerList(userId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfFollower, result.ListFollower.Count);
        }

        [TestMethod]
        public void GetFollowerList_ShouldReturnEmptyList_IfUserIdNotExist()
        {
            int userId = -1;
            int numberOfFollower = 0;

            // act 
            var result = FollowService.Instance.GetFollowerList(userId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfFollower, result.ListFollower.Count);
        }
        [TestMethod]
        public void GetFollowerList_ShouldReturnEmptyList_IfIdNotExist()
        {
            int userId = -2;
            int numberOfFollower = 0;

            // act 
            var result = FollowService.Instance.GetFollowerList(userId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(numberOfFollower, result.ListFollower.Count);
        }

        [TestMethod]
        public void FollowSomeone_ShouldReturnSuccessfully_IfInputValidInput()
        {
            // arrange
            int followerId = 18;
            int userGetFollowedId = 20;

            // act
            var result = FollowService.Instance.FollowSomeone(followerId, userGetFollowedId);

            //assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void UnFollowSomeone_ShouldReturnSuccessfully_IfInputValidInput()
        {
            // arrange
            int followerId = 18;
            int userGetFollowedId = 20;

            // act
            var result = FollowService.Instance.UnfollowSomeone(followerId, userGetFollowedId);

            //assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void CheckFollow_ShouldReturnTrue_IfInputValidInput()
        {
            // arrange
            int followerId = 8;
            int userGetFollowedId = 13;

            // act
            var result = FollowService.Instance.CheckFollowed(followerId, userGetFollowedId);

            //assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.IsFollowed);
        }
        [TestMethod]
        public void CheckFollow_ShouldReturnTrue_IfValidInput()
        {
            // arrange
            int followerId = 8;
            int userGetFollowedId = 13;

            // act
            var result = FollowService.Instance.CheckFollowed(followerId, userGetFollowedId);

            //assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.IsFollowed);
        }

        [TestMethod]
        public void CheckFollow_ShouldReturnFalse_IfInputValidInput()
        {
            // arrange
            int followerId = 10;
            int userGetFollowedId = 13;

            // act
            var result = FollowService.Instance.CheckFollowed(followerId, userGetFollowedId);

            //assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsFalse(result.IsFollowed);
        }
        [TestMethod]
        public void CheckFollow_ShouldReturnFalse_IfInvalidInput()
        {
            // arrange
            int followerId = 10;
            int userGetFollowedId = 13;

            // act
            var result = FollowService.Instance.CheckFollowed(followerId, userGetFollowedId);

            //assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsFalse(result.IsFollowed);
        }
    }
}
