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
    public class PostServiceTest
    {
        [TestMethod]
        public void GetAllPost_ShouldReturnListPostOfUser_IfUserIdExist()
        {
            // arrange 
            int userId = 7;
            int page = 1;
            int rowOfPage = 5;

            // act 
            var result = PostService.Instance.GetAllPost(userId, page, rowOfPage);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListPost.Count > 0);
        }

        [TestMethod]
        public void GetAllPublicPostOfUser_ShouldReturnListPublicPostOfUser_IfUserIdExist()
        {
            // arrange 
            PostViewModelIn postViewModelIn = new PostViewModelIn();
            postViewModelIn.AccountPost = 7;
            int userId = 7;
            int page = 1;
            int rowOfPage = 5;

            // act 
            var result = PostService.Instance.GetAllPublicPostOfUser(postViewModelIn, userId, page, rowOfPage);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListPost.Count > 0);
        }

        [TestMethod]
        public void DeletePostByID_ShouldReturnSuccessfullyCode_IfvalidInfomation()
        {
            // arrange 
            int postId = 87;
            int userId = 7;

            // act 
            var result = PostService.Instance.DeletePostByID(postId, userId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void GetListPostRecommend_ShouldReturnListPostRecomment_IfvalidInfomation()
        {
            // arrange 
            int userId = 7;
            int infoId = 12;
            int page = 1;
            int rowOfPage = 5;

            // act 
            var result = PostService.Instance.GetListPostRecommend(userId, infoId, page, rowOfPage);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListPost.Count >= 0);
        }

        [TestMethod]
        public void SearchPostByText_ShouldReturnListPost_MatchedWithKeyWord()
        {
            // arrange
            string keyword = "jean";
            int page = 1;
            int row = 5;

            // act
            var result = PostService.Instance.SearchPostByText(keyword, page, row);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListPost.Count > 0);
        }

        [TestMethod]
        public void UpdatePostContent_ShouldReturnSuccessfullyCode_ifValidInput()
        {
            // arrange
            int userId = 7;
            int postId = 78;
            string content = "Linh Ka";
            int prvacyId = 3;

            // act 
            var result = PostService.Instance.UpdatePostContent(userId, postId, content, prvacyId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void GetListCommentOfPost_ShouldReturnListCommentOfPost_IfValidInfomation()
        {
            // arrange
            PostViewModelIn postViewModelIn = new PostViewModelIn();
            postViewModelIn.PostID = 78;
            int page = 1;
            int row = 5;

            // act
            var result = PostService.Instance.GetListCommentOfPost(postViewModelIn, page, row);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListPost.Count > 0);
        }

        [TestMethod]
        public void GetAllPostOfUser_ShouldReturnListCommentOfPost_IfValidInfomation()
        {
            // arrange
            PostViewModelIn postViewModelIn = new PostViewModelIn();
            postViewModelIn.AccountPost = 7;
            int userId = 7;
            int page = 1;
            int row = 5;

            // act
            var result = PostService.Instance.GetAllPostOfUser(postViewModelIn, userId, page, row);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListPost.Count > 0);
        }

        [TestMethod]
        public void LikePost_ShouldReturnSuccessfullyCode_IfValidInfomation()
        {
            // arrange
            int postId = 78;
            int accountLike = 13;

            // act
            var result = PostService.Instance.LikePost(postId, accountLike);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void UnlikePost_ShouldReturnSuccessfullyCode_IfValidInfomation()
        {
            // arrange
            int postId = 78;
            int accountLike = 13;

            // act
            var result = PostService.Instance.UnLikePost(postId, accountLike);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void RatePost_ShouldReturnSuccessfullyCode_IfValidInfomation()
        {
            // arrange
            int postId = 78;
            int accountLike = 13;
            int ratePoint = 5;

            // act
            var result = PostService.Instance.RatePost(postId, accountLike, ratePoint);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void GetPostDetail_ShouldReturnSuccessfullyCode_IfValidInfomation()
        {
            // arrange
            PostViewModelIn postViewModelIn = new PostViewModelIn();
            postViewModelIn.PostID = 78;
            int userId = 13;
            int rowCommentOfPost = 5;

            // act
            var result = PostService.Instance.GetPostDetail(postViewModelIn, userId, rowCommentOfPost);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListPost.Count >= 0);
        }

        [TestMethod]
        public void CommentPost_ShouldReturnSuccessfullyCode_IfValidInfomation()
        {
            // arrange
            int accountId = 13;
            int postId = 78;
            string content = "hello linh ka";

            // act
            var result = PostService.Instance.CommentPost(accountId, postId, content);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListPost.Count >= 0);
        }

        [TestMethod]
        public void GetPostByUserWithoutPaging_ShouldReturnListPost()
        {
            // arrange
            int accountId = 7;

            // act
            var result = PostService.Instance.GetPostByUserWithoutPaging(accountId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListPost.Count >= 0);
        }

        [TestMethod]
        public void GetPostWithoutPaging_ShouldReturnListPost()
        {
            // arrange

            // act
            var result = PostService.Instance.GetAllPostWithoutPaging();

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.IsTrue(result.ListPost.Count >= 0);
        }

        [TestMethod]
        public void GetPostWithoutPaging_ShouldReturnPostDetail_IfMatchedPostId()
        {
            // arrange
            int postId = 78;

            // act
            var result = PostService.Instance.AdminGetPostDetail(postId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

    }
}
