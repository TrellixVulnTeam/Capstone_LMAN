﻿using Clarifai.Api;
using Google.Protobuf.Collections;
using Microsoft.AspNetCore.SignalR;
using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;

using SOFA_API.ViewModel.Account;
using SOFA_API.ViewModel.Newsfeed;
using SOFA_API.ViewModel.PostViewModel;
using SOFA_API.Hubs;
using SOFA_API.ViewModel.Notification;
using SOFA_API.ViewModel.Profile;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class PostService
    {
        private static PostService instance;
        private IHubContext<NotificationHub> notificationHub;

        public static PostService Instance
        {
            get
            {
                if (instance == null) instance = new PostService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }

        public void setHub(IHubContext<NotificationHub> notiHub)
        {
            this.notificationHub = notiHub;
        }

        public PostService() { }
        /// <summary>
        /// Service of Get all post controller
        /// </summary>
        /// <returns></returns>
        public PostViewModelOut GetAllPost(int userID, int page, int rowsOfPage)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();

            try
            {
                List<Post> listAllPost = PostDAO.Instance.GetAllPost(page, rowsOfPage);
                foreach (Post item in listAllPost)
                {
                    Profile profile = ProfileDAO.Instance.GetProfileByAccountID(item.AccountPost);
                    if (profile != null && profile.IsActive && !profile.IsBlock)
                    {
                        PostModelOut postModelOut = new PostModelOut();
                        postModelOut.SetPostDetail(item);
                        postModelOut.SetAccountPost(profile);
                        postModelOut.NumberOfLike = LikeDAO.Instance.CountLikeOfPost(item.ID);
                        postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(item.ID);
                        postModelOut.NumberOfComment = CommentDAO.Instance.CountCommentOfPost(item.ID);
                        postModelOut.ListImage = PostImageDAO.Instance.GetPostImages(item.ID);
                        if (userID != 0)
                        {
                            postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(item.ID, userID) != null;
                            Rate rateTemp = RateDAO.Instance.GetRatingOfUser(item.ID, userID);
                            postModelOut.MyRatePoint = rateTemp != null ? rateTemp.RatePoint : 0;
                            MarkupPost markupPost = MarkupPostDAO.Instance.GetMarkupPostByPostIDAndAccountID(item.ID, userID);
                            postModelOut.IsMarked = markupPost != null ? true : false;
                        }
                        postViewModelOut.ListPost.Add(postModelOut);
                    }
                }
                postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
            }
            return postViewModelOut;
        }

        internal PostViewModelOut GetFashionistaPost(int userID, int page, int rowsOfPage)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();

            try
            {
                List<Post> listAllPost = PostDAO.Instance.GetFashionistaPost(page, rowsOfPage);
                foreach (Post item in listAllPost)
                {
                    Profile profile = ProfileDAO.Instance.GetProfileByAccountID(item.AccountPost);
                    if (profile != null && profile.IsActive && !profile.IsBlock)
                    {
                        PostModelOut postModelOut = new PostModelOut();
                        postModelOut.SetPostDetail(item);
                        postModelOut.SetAccountPost(profile);
                        postModelOut.NumberOfLike = LikeDAO.Instance.CountLikeOfPost(item.ID);
                        postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(item.ID);
                        postModelOut.NumberOfComment = CommentDAO.Instance.CountCommentOfPost(item.ID);
                        postModelOut.ListImage = PostImageDAO.Instance.GetPostImages(item.ID);
                        if (userID != 0)
                        {
                            postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(item.ID, userID) != null;
                            Rate rateTemp = RateDAO.Instance.GetRatingOfUser(item.ID, userID);
                            postModelOut.MyRatePoint = rateTemp != null ? rateTemp.RatePoint : 0;
                            MarkupPost markupPost = MarkupPostDAO.Instance.GetMarkupPostByPostIDAndAccountID(item.ID, userID);
                            postModelOut.IsMarked = markupPost != null ? true : false;
                        }
                        postViewModelOut.ListPost.Add(postModelOut);
                    }
                }
                postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
            }
            return postViewModelOut;
        }

        /// <summary>
        /// Service of get public post controller
        /// </summary>
        /// <param name="postViewModelIn"></param>
        /// <returns></returns>
        public PostViewModelOut GetAllPublicPostOfUser(PostViewModelIn postViewModelIn, int userID, int page, int rowsOfPage)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();

            try
            {
                List<Post> listAllPost = PostDAO.Instance.GetAllPublicPostOfUser(postViewModelIn.AccountPost, page, rowsOfPage);

                foreach (Post item in listAllPost)
                {
                    Profile profile = ProfileDAO.Instance.GetProfileByAccountID(item.AccountPost);
                    if (profile != null && profile.IsActive && !profile.IsBlock)
                    {
                        PostModelOut postModelOut = new PostModelOut();
                        postModelOut.SetPostDetail(item);
                        postModelOut.SetAccountPost(profile);
                        postModelOut.NumberOfLike = LikeDAO.Instance.CountLikeOfPost(item.ID);
                        postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(item.ID);
                        postModelOut.NumberOfComment = CommentDAO.Instance.CountCommentOfPost(item.ID);
                        postModelOut.ListImage = PostImageDAO.Instance.GetPostImages(item.ID);
                        if (userID != 0)
                        {
                            postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(item.ID, userID) != null;
                            Rate rateTemp = RateDAO.Instance.GetRatingOfUser(item.ID, userID);
                            postModelOut.MyRatePoint = rateTemp != null ? rateTemp.RatePoint : 0;
                            MarkupPost markupPost = MarkupPostDAO.Instance.GetMarkupPostByPostIDAndAccountID(item.ID, userID);
                            postModelOut.IsMarked = markupPost != null ? true : false;
                        }
                        postViewModelOut.ListPost.Add(postModelOut);
                    }
                }
                postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
            }
            return postViewModelOut;
        }
        /// <summary>
        /// Service of delete post controller
        /// </summary>
        /// <param name="postID"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public PostViewModelOut DeletePostByID(int postID, int userID)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();
            try
            {
                Post post = PostDAO.Instance.GetPostByID(postID);
                if (post.AccountPost == userID)
                {
                    PostModelOut postModelOut = new PostModelOut();
                    int flag = PostDAO.Instance.DeletePostByPostID(postID);
                    if (flag > 0)
                    {
                        postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                        postModelOut.ID = postID;
                        postViewModelOut.ListPost.Add(postModelOut);
                    }
                    else
                    {
                        postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                    }
                }
                else
                {
                    postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                    postViewModelOut.ErrorMessage = MessageUtils.ERROR_DONT_HAVE_PERMISSION;
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.ToString();
            }
            return postViewModelOut;
        }



        /// <summary>
        /// Compare two post model out by rate point average
        /// </summary>
        /// <param name="o1"></param>
        /// <param name="o2"></param>
        /// <returns></returns>
        private int comparePostModelOutByRateAve(PostModelOut o1, PostModelOut o2)
        {
            if (o1.RateAverage > o2.RateAverage)
            {
                return -1;
            }
            if (o1.RateAverage < o2.RateAverage)
            {
                return 1;

            }
            return 0;
        }

        /// <summary>
        /// Get list post that recommend for user of body measurements 
        /// </summary>
        /// <param name="infoID">ID of Info (body measurements)</param>
        /// <param name="userID">ID of user</param>
        /// <returns>Post View Model Out</returns>
        public PostViewModelOut GetListPostRecommend(int userID, int infoID, int page, int rowsOfPage)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();
            try
            {
                List<Post> listAllPost = PostDAO.Instance.GetAllPostByInfoID(infoID, page, rowsOfPage);
                listAllPost.RemoveAll(post => post.AccountPost == userID);
                foreach (Post item in listAllPost)
                {
                    Profile profile = ProfileDAO.Instance.GetProfileByAccountID(item.AccountPost);
                    if (profile != null && profile.IsActive && !profile.IsBlock)
                    {
                        PostModelOut postModelOut = new PostModelOut();
                        postModelOut.SetPostDetail(item);
                        postModelOut.SetAccountPost(profile);
                        postModelOut.NumberOfLike = LikeDAO.Instance.CountLikeOfPost(item.ID);
                        postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(item.ID);
                        postModelOut.NumberOfComment = CommentDAO.Instance.CountCommentOfPost(item.ID);
                        postModelOut.ListImage = PostImageDAO.Instance.GetPostImages(item.ID);
                        if (userID != 0)
                        {
                            postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(item.ID, userID) != null;
                            Rate rateTemp = RateDAO.Instance.GetRatingOfUser(item.ID, userID);
                            postModelOut.MyRatePoint = rateTemp != null ? rateTemp.RatePoint : 0;
                            MarkupPost markupPost = MarkupPostDAO.Instance.GetMarkupPostByPostIDAndAccountID(item.ID, userID);
                            postModelOut.IsMarked = markupPost != null ? true : false;
                        }
                        if (postModelOut.RateAverage > 4)
                        {
                            postViewModelOut.ListPost.Add(postModelOut);
                        }
                    }
                }
                postViewModelOut.ListPost.Sort(comparePostModelOutByRateAve);
                postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
            }
            return postViewModelOut;
        }

        public PostViewModelOut SearchPostByText(string keyword, int page, int rowsOfPage)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();

            try
            {
                List<Post> listAllPost = PostDAO.Instance.SearchPostByText(keyword, page, rowsOfPage);
                foreach (Post item in listAllPost)
                {
                    Profile profile = ProfileDAO.Instance.GetProfileByAccountID(item.AccountPost);
                    if (profile != null && profile.IsActive && !profile.IsBlock)
                    {
                        PostModelOut postModelOut = new PostModelOut();
                        postModelOut.SetPostDetail(item);
                        postModelOut.SetAccountPost(profile);
                        postModelOut.NumberOfLike = LikeDAO.Instance.CountLikeOfPost(item.ID);
                        postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(item.ID);
                        postModelOut.NumberOfComment = CommentDAO.Instance.CountCommentOfPost(item.ID);
                        postModelOut.ListImage = PostImageDAO.Instance.GetPostImages(item.ID);
                        postViewModelOut.ListPost.Add(postModelOut);
                    }
                }
                postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
            }
            return postViewModelOut;
        }

        /// <summary>
        /// Update content of a post
        /// </summary>
        /// <param name="userID">ID of user who make this action</param>
        /// <param name="postID">ID of the post</param>
        /// <param name="content">New content of post</param>
        /// <returns>PostViewModelOut</returns>
        public PostViewModelOut UpdatePostContent(int userID, int postID, string content, int privacyID)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();
            Profile profile = ProfileDAO.Instance.GetProfileByAccountID(userID);
            if (profile == null || profile.IsBlock || !profile.IsActive)
            {
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
            }
            else try
                {
                    Post postTemp = PostDAO.Instance.GetPostByID(postID);
                    if (postTemp.AccountPost == userID)
                    {
                        int res = PostDAO.Instance.UpdatePost(postID, content, privacyID, postTemp.Time, postTemp.BodyInfoID, postTemp.IsVerified);
                        if (res > 0)
                        {
                            postTemp.Content = content;
                            postTemp.PrivacyID = privacyID;
                            PostModelOut postModelOut = new PostModelOut();
                            postModelOut.SetPostDetail(postTemp);
                            postViewModelOut.ListPost.Add(postModelOut);
                            postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                        }
                        else
                        {
                            postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                        }
                    }
                    else
                    {
                        postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                        postViewModelOut.ErrorMessage = MessageUtils.ERROR_DONT_HAVE_PERMISSION;
                    }
                }
                catch (Exception e)
                {
                    Utils.Instance.SaveLog(e.ToString());
                    postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                    postViewModelOut.ErrorMessage = e.Message;
                }

            return postViewModelOut;
        }

        /// <summary>
        /// Service of get list comment of post
        /// </summary>
        /// <param name="postViewModelIn"></param>
        /// <returns></returns>
        public PostViewModelOut GetListCommentOfPost(PostViewModelIn postViewModelIn, int page, int rowsOfPage)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();
            try
            {
                PostModelOut postModelOut = new PostModelOut();
                List<Comment> comments = CommentDAO.Instance.GetAllCommentOfPost(postViewModelIn.PostID, page, rowsOfPage);
                List<CommentModelOut> commentModelOuts = new List<CommentModelOut>();
                foreach (Comment comment in comments)
                {
                    Profile profile = ProfileDAO.Instance.GetProfileByAccountID(comment.AccountID);
                    if (profile != null && profile.IsActive && !profile.IsBlock)
                    {
                        CommentModelOut commentModelOut = new CommentModelOut();
                        commentModelOut.SetComment(comment);
                        commentModelOut.SetAccountComment(profile);
                        commentModelOuts.Add(commentModelOut);
                    }
                }
                postModelOut.ListComment = commentModelOuts;
                postModelOut.ID = postViewModelIn.PostID;
                postViewModelOut.ListPost.Add(postModelOut);
                postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
            }
            return postViewModelOut;
        }

        /// <summary>
        /// Service of get post of user controller
        /// </summary>
        /// <param name="postViewModelIn"></param>
        /// <returns></returns>
        public PostViewModelOut GetAllPostOfUser(PostViewModelIn postViewModelIn, int userID, int page, int rowsOfPage)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();

            try
            {
                List<Post> listAllPost = PostDAO.Instance.GetAllPostOfUser(postViewModelIn.AccountPost, page, rowsOfPage);

                foreach (Post item in listAllPost)
                {
                    Profile profile = ProfileDAO.Instance.GetProfileByAccountID(item.AccountPost);
                    if (profile != null && profile.IsActive && !profile.IsBlock)
                    {
                        PostModelOut postModelOut = new PostModelOut();
                        postModelOut.SetPostDetail(item);
                        postModelOut.SetAccountPost(profile);
                        postModelOut.NumberOfLike = LikeDAO.Instance.CountLikeOfPost(item.ID);
                        postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(item.ID);
                        postModelOut.NumberOfComment = CommentDAO.Instance.CountCommentOfPost(item.ID);
                        postModelOut.ListImage = PostImageDAO.Instance.GetPostImages(item.ID);
                        if (userID != 0)
                        {
                            postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(item.ID, userID) != null;
                            Rate rateTemp = RateDAO.Instance.GetRatingOfUser(item.ID, userID);
                            postModelOut.MyRatePoint = rateTemp != null ? rateTemp.RatePoint : 0;
                            MarkupPost markupPost = MarkupPostDAO.Instance.GetMarkupPostByPostIDAndAccountID(item.ID, userID);
                            postModelOut.IsMarked = markupPost != null ? true : false;
                        }
                        postViewModelOut.ListPost.Add(postModelOut);
                    }
                }
                postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
            }
            return postViewModelOut;
        }

        /// <summary>
        /// Service of like post controller
        /// </summary>
        /// <param name="postID"></param>
        /// <param name="accountLike"></param>
        /// <returns></returns>
        public PostViewModelOut LikePost(int postID, int accountLike)
        {
            int res = 0;
            res = LikeDAO.Instance.LikePost(postID, accountLike);
            PostViewModelOut result = new PostViewModelOut();
            Profile profile = ProfileDAO.Instance.GetProfileByAccountID(accountLike);
            if (profile == null || profile.IsBlock || !profile.IsActive)
            {
                result.Code = Const.REQUEST_CODE_FAILED;
            }
            else try
                {
                    if (res != 0)
                    {
                        PostModelOut postModelOut = new PostModelOut();
                        postModelOut.ID = postID;
                        postModelOut.NumberOfLike = LikeDAO.Instance.CountLikeOfPost(postID);
                        postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(postID, accountLike) != null;
                        postModelOut.ListLike = LikeDAO.Instance.GetAllLikeOfPost(postID);
                        result.ListPost.Add(postModelOut);
                        result.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    }
                    else
                    {
                        result.Code = Const.REQUEST_CODE_FAILED;
                    }
                }
                catch (Exception e)
                {
                    Utils.Instance.SaveLog(e.ToString());
                    result.Code = Const.REQUEST_CODE_FAILED;
                    result.ErrorMessage = e.Message;
                }
            return result;
        }
        /// <summary>
        /// Service of like post controller
        /// </summary>
        /// <param name="postID"></param>
        /// <param name="accountLike"></param>
        /// <returns></returns>
        public PostViewModelOut UnLikePost(int postID, int accountLike)
        {
            int res = 0;
            res = LikeDAO.Instance.UnLikePost(postID, accountLike);
            PostViewModelOut result = new PostViewModelOut();
            Profile profile = ProfileDAO.Instance.GetProfileByAccountID(accountLike);
            if (profile == null || profile.IsBlock || !profile.IsActive)
            {
                result.Code = Const.REQUEST_CODE_FAILED;
            }
            else try
                {
                    if (res != 0)
                    {
                        PostModelOut postModelOut = new PostModelOut();
                        postModelOut.ID = postID;
                        postModelOut.NumberOfLike = LikeDAO.Instance.CountLikeOfPost(postID);
                        postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(postID, accountLike) != null;
                        postModelOut.ListLike = LikeDAO.Instance.GetAllLikeOfPost(postID);
                        result.ListPost.Add(postModelOut);
                        result.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    }
                    else
                    {
                        result.Code = Const.REQUEST_CODE_FAILED;
                    }
                }
                catch (Exception e)
                {
                    Utils.Instance.SaveLog(e.ToString());
                    result.Code = Const.REQUEST_CODE_FAILED;
                    result.ErrorMessage = e.Message;
                }
            return result;
        }
        /// <summary>
        /// Service of rate post controller
        /// </summary>
        /// <param name="postID"></param>
        /// <param name="accountLike"></param>
        /// <param name="ratePoint"></param>
        /// <returns></returns>
        public PostViewModelOut RatePost(int postID, int accountLike, int ratePoint)
        {
            PostViewModelOut result = new PostViewModelOut();
            if (ratePoint < 0 || ratePoint > 5)
            {
                result.Code = Const.REQUEST_CODE_FAILED;
                result.ErrorMessage = MessageUtils.ERROR_RATE_POST_POINT_INVALID;
                return result;
            }
            int ID = 0;
            Profile profile = ProfileDAO.Instance.GetProfileByAccountID(accountLike);
            if (profile == null || profile.IsBlock || !profile.IsActive)
            {
                result.Code = Const.REQUEST_CODE_FAILED;
                return result;
            }
            ID = RateDAO.Instance.RatePost(postID, accountLike, ratePoint);
            try
            {
                if (ID != 0)
                {
                    PostModelOut postModelOut = new PostModelOut();
                    postModelOut.ID = postID;
                    postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(postID);
                    if (ratePoint > 0)
                    {
                        postModelOut.MyRatePoint = RateDAO.Instance.GetRatingOfUser(postID, accountLike).RatePoint;
                    }
                    else
                    {
                        postModelOut.MyRatePoint = 0;
                    }
                    result.ListPost.Add(postModelOut);
                    result.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    result.Code = Const.REQUEST_CODE_FAILED;
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                result.Code = Const.REQUEST_CODE_FAILED;
                result.ErrorMessage = e.Message;
            }
            return result;
        }
        /// <summary>
        /// Service process get detail of a post
        /// </summary>
        /// <param name="postViewModelIn">Include ID of the post(postID)</param>
        /// <returns>PostViewModelOut include list of the post </returns>
        public PostViewModelOut GetPostDetail(PostViewModelIn postViewModelIn, int userID, int commentRowsOfPage)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();
            try
            {
                PostModelOut postModelOut = new PostModelOut();
                Post post = PostDAO.Instance.GetPostByID(postViewModelIn.PostID);
                if (post != null && post.ID > 0)
                {
                    Profile profile = ProfileDAO.Instance.GetProfileByAccountID(post.AccountPost);
                    if (profile != null && profile.IsActive && !profile.IsBlock)
                    {
                        postModelOut.SetPostDetail(post);
                        postModelOut.SetAccountPost(profile);
                        postModelOut.ListLike = LikeDAO.Instance.GetAllLikeOfPost(postViewModelIn.PostID);

                        List<Comment> comments = CommentDAO.Instance.GetAllCommentOfPost(postViewModelIn.PostID, 1, commentRowsOfPage);
                        List<CommentModelOut> commentModelOuts = new List<CommentModelOut>();
                        foreach (Comment comment in comments)
                        {
                            Profile profileComment = ProfileDAO.Instance.GetProfileByAccountID(comment.AccountID);
                            if (profileComment != null && profileComment.IsActive && !profileComment.IsBlock)
                            {
                                CommentModelOut commentModelOut = new CommentModelOut();
                                commentModelOut.SetComment(comment);
                                commentModelOut.SetAccountComment(profileComment);
                                commentModelOuts.Add(commentModelOut);
                            }
                        }
                        postModelOut.ListComment = commentModelOuts;
                        postModelOut.ListRate = RateDAO.Instance.GetListOfRate(postViewModelIn.PostID);
                        postModelOut.ListImage = PostImageDAO.Instance.GetPostImages(postViewModelIn.PostID);
                        postModelOut.NumberOfComment = CommentDAO.Instance.CountCommentOfPost(postViewModelIn.PostID);
                        postModelOut.NumberOfLike = postModelOut.ListLike.Count;
                        postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(postViewModelIn.PostID);
                        if (userID != 0)
                        {
                            postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(post.ID, userID) != null;
                            Rate rateTemp = RateDAO.Instance.GetRatingOfUser(post.ID, userID);
                            postModelOut.MyRatePoint = rateTemp != null ? rateTemp.RatePoint : 0;
                            MarkupPost markupPost = MarkupPostDAO.Instance.GetMarkupPostByPostIDAndAccountID(post.ID, userID);
                            postModelOut.IsMarked = markupPost != null ? true : false;
                        }
                        postViewModelOut.ListPost.Add(postModelOut);
                        postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    }
                    else
                    {
                        postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                    }
                }
                else
                {
                    postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
            }
            return postViewModelOut;
        }
        /// <summary>
        /// Service of comment post controller
        /// </summary>
        /// <param name="accountID"></param>
        /// <param name="postID"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public PostViewModelOut CommentPost(int accountID, int postID, string content)
        {
            Comment comment = CommentDAO.Instance.CommentPost(accountID, postID, content);
            PostViewModelOut result = new PostViewModelOut();
            Profile profile = ProfileDAO.Instance.GetProfileByAccountID(accountID);
            if (profile == null || profile.IsBlock || !profile.IsActive)
            {
                result.Code = Const.REQUEST_CODE_FAILED;
            }
            else try
                {
                    if (comment != null && comment.ID > 0)
                    {
                        PostModelOut postModelOut = new PostModelOut();
                        postModelOut.ID = postID;
                        List<CommentModelOut> commentModelOuts = new List<CommentModelOut>();
                        Profile profileComment = ProfileDAO.Instance.GetProfileByAccountID(comment.AccountID);
                        if (profileComment != null && profileComment.IsActive && !profileComment.IsBlock)
                        {
                            CommentModelOut commentModelOut = new CommentModelOut();
                            commentModelOut.SetComment(comment);
                            commentModelOut.SetAccountComment(profileComment);
                            commentModelOuts.Add(commentModelOut);
                        }
                        postModelOut.ListComment = commentModelOuts;

                        result.ListPost.Add(postModelOut);
                        result.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    }
                    else
                    {
                        result.Code = Const.REQUEST_CODE_FAILED;
                    }
                }
                catch (Exception e)
                {
                    Utils.Instance.SaveLog(e.ToString());
                    result.Code = Const.REQUEST_CODE_FAILED;
                    result.ErrorMessage = e.Message;
                }
            return result;
        }
        /// <summary>
        /// Create new post
        /// </summary>
        /// <param name="postViewModelIn">
        /// Date of the post that user send to server
        /// </param>
        /// <returns></returns>
        public PostViewModelOut CreateNewPost(PostViewModelIn postViewModelIn)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();
            try
            {
                Post post = new Post(0, postViewModelIn.Content, postViewModelIn.PrivacyID, postViewModelIn.Time, postViewModelIn.AccountPost, postViewModelIn.BodyInfoID, false, postViewModelIn.Type);
                Profile profile = ProfileDAO.Instance.GetProfileByAccountID(postViewModelIn.AccountPost);
                if (profile == null || profile.IsBlock || !profile.IsActive)
                {
                    postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                    return postViewModelOut;
                }
                post = PostDAO.Instance.CreatePost(post);
                if (post != null && post.ID != 0)
                {
                    PostModelOut postModelOut = new PostModelOut();
                    postModelOut.SetPostDetail(post);
                    ProfileViewModelOut currentProfile = ProfileService.Instance.GetProfileModelByAccountID(postViewModelIn.AccountPost);
                    if (currentProfile != null)
                    {
                        foreach (ImageModelIn imageModelIn in postViewModelIn.ListImage)
                        {
                            DTO.Image image = new DTO.Image(post.ID, "");
                            image = PostImageDAO.Instance.AddImagePost(image);
                            if (image.ID > 0)
                            {
                                string filename = post.ID + "_" + image.ID + ".png";
                                string path = Const.ASSETS_PATH_POST_IMAGE.Replace("@username", currentProfile.UserName);
                                string imageContent = imageModelIn.Image;
                                Utils.Instance.SaveImageFromBase64String(imageContent, path, filename);
                                image.Url = Path.Combine(path, filename);
                                int res = PostImageDAO.Instance.UpdateImage(image.ID, image.Url);
                                postModelOut.ListImage.Add(image);
                            }
                        }
                    }
                    postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    postViewModelOut.ListPost.Add(postModelOut);
                    bool isValidate = (bool)ValidatePost(postModelOut);
                    if (isValidate)
                    {
                        int res = PostDAO.Instance.UpdatePost(postModelOut.ID, postModelOut.Content, postModelOut.PrivacyID, postModelOut.Time, postModelOut.BodyInfoID, true);
                        if (post.Type == Const.POST_TYPE_PRODUCT)
                        {
                            ClarifaiUtils clarifaiUtils = new ClarifaiUtils();
                            foreach (DTO.Image image in postModelOut.ListImage)
                            {
                                string url = "https://chientranhvietnam.org/assets/" + image.Url;
                                string name = image.PostID + "-" + image.ID;
                                object o = clarifaiUtils.AddImage(url, name);
                                Utils.Instance.SaveLog(o.ToString());
                            }
                        }
                    }
                    else
                    {
                        NotificationViewModelIn notificationViewModelIn = new NotificationViewModelIn(Const.NOTIFICATION_TYPE_INVALID_IMAGE, post.ID, 0);
                        NotificationViewModelOut notificationViewModelOut = NotificationService.Instance.CreatedNotification(notificationViewModelIn);
                        notificationHub.Clients.User(notificationViewModelOut.ToAccount.ToString()).SendAsync("NewNotification", notificationViewModelOut);
                    }
                }
                else
                {
                    postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
            }
            return postViewModelOut;

        }
        /// <summary>
        /// Verify that image have or not invalid content
        /// </summary>
        /// <param name="Data of the post"></param>
        /// <returns></returns>
        public bool ValidatePost(PostModelOut postModelOut)
        {

            ClarifaiUtils clarifaiUtils = new ClarifaiUtils();
            for (int i = 0; i < postModelOut.ListImage.Count; i++)
            {
                RepeatedField<Concept> listConcept = clarifaiUtils.ModeratationImage("https://chientranhvietnam.org/assets/" + postModelOut.ListImage[i].Url);
                if (listConcept[0].Name != "sfw")
                {
                    return false;
                }
            }
            return true;
        }
        public object Verify(int postID)
        {
            Post post = PostDAO.Instance.GetPostByID(postID);
            PostModelOut postModelOut = new PostModelOut();
            postModelOut.SetPostDetail(post);
            Profile profile = ProfileDAO.Instance.GetProfileByAccountID(post.AccountPost);
            postModelOut.SetAccountPost(profile);
            postModelOut.ListImage = PostImageDAO.Instance.GetPostImages(postID);
            return ValidatePost(postModelOut);
        }

        public AdminPostViewModelOut GetAllPostWithoutPaging()
        {
            AdminPostViewModelOut listPost = new AdminPostViewModelOut();

            try
            {
                List<Post> listAllPost = PostDAO.Instance.GetAllPostWithoutPaging();

                foreach (Post item in listAllPost)
                {
                    AccountViewModelOut account = AccountDAO.Instance.GetUserById(item.AccountPost);
                    AdminPostModelOut postModelOut = new AdminPostModelOut();
                    postModelOut.Id = item.ID;
                    postModelOut.Content = item.Content;
                    postModelOut.DateCreated = item.Time;
                    postModelOut.PostedBy = account.Username;
                    var images = PostImageDAO.Instance.GetPostImages(item.ID).ToList();
                    postModelOut.PostImageUri = images[0].Url;
                    postModelOut.IsActive = true;

                    listPost.ListPost.Add(postModelOut);
                }
                listPost.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                listPost.Code = Const.REQUEST_CODE_FAILED;
                listPost.ErrorMessage = e.Message;
            }
            return listPost;
        }
        /// <summary>
        /// Get the post of image
        /// </summary>
        /// <param name="userID">ID of user who search sell place</param>
        /// <param name="id">ID of the image that you want to get</param>
        /// <param name="listPost">List of post found before. This use to check the post is not repeat</param>
        /// <returns>Data of the post</returns>
        private PostModelOut GetPostByImage(int userID, string id, List<PostModelOut> listPost)
        {
            try
            {
                PostModelOut postModelOut = new PostModelOut();
                //ID of the image is concatenated of postID and imageID
                int postID = Int32.Parse(id.Split('-')[0]);
                foreach (PostModelOut item in listPost)
                {
                    if (item.ID == postID)
                    {
                        return null;
                    }
                }
                Post post = PostDAO.Instance.GetPostByID(postID);
                if (post.ID > 0)
                {
                    if (post.Type == Const.POST_TYPE_NORMAL)
                    {
                        return null;
                    }
                    postModelOut.SetPostDetail(post);
                    Profile profile = ProfileDAO.Instance.GetProfileByAccountID(post.AccountPost);
                    if (!(profile != null && profile.IsActive && !profile.IsBlock)) return null;
                    postModelOut.SetAccountPost(profile);
                    postModelOut.ListImage = PostImageDAO.Instance.GetPostImages(postID);
                    postModelOut.NumberOfComment = CommentDAO.Instance.CountCommentOfPost(postID);
                    postModelOut.NumberOfLike = postModelOut.ListLike.Count;
                    postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(postID);
                    if (userID != 0)
                    {
                        postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(post.ID, userID) != null;
                        Rate rateTemp = RateDAO.Instance.GetRatingOfUser(post.ID, userID);
                        postModelOut.MyRatePoint = rateTemp != null ? rateTemp.RatePoint : 0;
                        MarkupPost markupPost = MarkupPostDAO.Instance.GetMarkupPostByPostIDAndAccountID(post.ID, userID);
                        postModelOut.IsMarked = markupPost != null ? true : false;
                    }
                    return postModelOut;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                return null;
            }
        }

        /// <summary>
        /// Service process for endpoind search seller
        /// </summary>
        /// <param name="userID">ID of the user who make query</param>
        /// <param name="postViewModelIn">Data include image</param>
        /// <returns>Post view model out</returns>
        public PostViewModelOut SearchPostByImage(int userID, PostViewModelIn postViewModelIn)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();
            ClarifaiUtils clarifaiUtils = new ClarifaiUtils();
            try
            {
                ImageModelIn imageQuery = postViewModelIn.ListImage[0];
                ProfileViewModelOut currentProfile = ProfileService.Instance.GetProfileModelByAccountID(userID);
                if (currentProfile != null)
                {
                    DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
                    long ms = (long)(DateTime.UtcNow - epoch).TotalMilliseconds;
                    string filename = ms + ".png";
                    string path = Const.ASSETS_PATH_QUERY_IMAGE.Replace("@username", currentProfile.UserName);
                    string imageContent = imageQuery.Image;
                    Utils.Instance.SaveImageFromBase64String(imageContent, path, filename);
                    string imageUrl = Path.Combine(path, filename);
                    RepeatedField<Hit> searchResults = clarifaiUtils.SearchImageTemp(Const.DOMAIN_ASSETS + imageUrl);
                    Utils.Instance.SaveLog(searchResults.ToString());
                    foreach (Hit result in searchResults)
                    {
                        if (result.Score > 0.85)
                        {
                            PostModelOut postModelOut = GetPostByImage(userID, result.Input.Id, postViewModelOut.ListPost);
                            if (postModelOut != null)
                            {
                                postViewModelOut.ListPost.Add(postModelOut);
                            }
                        }
                    }
                    postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }

            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
                postViewModelOut.ListPost = new List<PostModelOut>();
            }
            return postViewModelOut;
        }

        public AdminPostViewModelOut GetPostByUserWithoutPaging(int accountId)
        {
            AdminPostViewModelOut listPost = new AdminPostViewModelOut();

            try
            {
                List<Post> listAllPost = PostDAO.Instance.GetPostByUserWithoutPaging(accountId);

                foreach (Post item in listAllPost)
                {
                    AccountViewModelOut account = AccountDAO.Instance.GetUserById(item.AccountPost);
                    AdminPostModelOut postModelOut = new AdminPostModelOut();
                    postModelOut.Id = item.ID;
                    postModelOut.Content = item.Content;
                    postModelOut.DateCreated = item.Time;
                    postModelOut.PostedBy = account.Username;
                    var images = PostImageDAO.Instance.GetPostImages(item.ID).ToList();
                    postModelOut.PostImageUri = images[0].Url;
                    postModelOut.IsActive = true;

                    listPost.ListPost.Add(postModelOut);
                }
                listPost.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                listPost.Code = Const.REQUEST_CODE_FAILED;
                listPost.ErrorMessage = e.Message;
            }
            return listPost;
        }

        public AdminPostDetailModelOut AdminGetPostDetail(int postId)
        {
            AdminPostDetailModelOut postDetail = new AdminPostDetailModelOut();
            try
            {
                PostModelOut postModelOut = new PostModelOut();
                Post post = PostDAO.Instance.GetPostByID(postId);
                Profile profile = ProfileDAO.Instance.GetProfileByAccountID(post.AccountPost);
                postModelOut.SetPostDetail(post);
                postModelOut.SetAccountPost(profile);
                postModelOut.ListLike = LikeDAO.Instance.GetAllLikeOfPost(postId);

                List<Comment> comments = CommentDAO.Instance.GetAllCommentOfPostWithoutPaging(postId);
                List<CommentModelOut> commentModelOuts = new List<CommentModelOut>();
                foreach (Comment comment in comments)
                {
                    Profile profileComment = ProfileDAO.Instance.GetProfileByAccountID(comment.AccountID);
                    CommentModelOut commentModelOut = new CommentModelOut();
                    commentModelOut.SetComment(comment);
                    commentModelOut.SetAccountComment(profileComment);
                    commentModelOuts.Add(commentModelOut);
                }
                postModelOut.ListComment = commentModelOuts;
                postModelOut.ListRate = RateDAO.Instance.GetListOfRate(postId);
                postModelOut.ListImage = PostImageDAO.Instance.GetPostImages(postId);
                postModelOut.NumberOfComment = postModelOut.ListComment.Count;
                postModelOut.NumberOfLike = postModelOut.ListLike.Count;
                postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(postId);
                if (post.AccountPost != 0)
                {
                    postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(post.ID, post.AccountPost) != null;
                    Rate rateTemp = RateDAO.Instance.GetRatingOfUser(post.ID, post.AccountPost);
                    postModelOut.MyRatePoint = rateTemp != null ? rateTemp.RatePoint : 0;
                    MarkupPost markupPost = MarkupPostDAO.Instance.GetMarkupPostByPostIDAndAccountID(post.ID, post.AccountPost);
                    postModelOut.IsMarked = markupPost != null ? true : false;
                }

                postDetail.Id = postModelOut.ID;
                postDetail.AccountPost = postModelOut.AccountPost;
                postDetail.PostedBy = postModelOut.FirstName + " " + postModelOut.LastName;
                postDetail.DateCreated = postModelOut.Time;
                postDetail.Content = postModelOut.Content;
                postDetail.ListImage = postModelOut.ListImage;
                postDetail.TotalLike = postModelOut.NumberOfLike;
                postDetail.RateAverage = postModelOut.RateAverage;
                postDetail.ListComment = postModelOut.ListComment;
                postDetail.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postDetail.Code = Const.REQUEST_CODE_FAILED;
                postDetail.ErrorMessage = e.Message;
            }
            return postDetail;
        }

        public PostViewModelOut AdminDeletePostByID(int postID)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();
            try
            {
                Post post = PostDAO.Instance.GetPostByID(postID);
                if (post != null)
                {
                    PostModelOut postModelOut = new PostModelOut();
                    int flag = PostDAO.Instance.DeletePostByPostID(postID);
                    if (flag > 0)
                    {
                        postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                        postModelOut.ID = postID;
                        postViewModelOut.ListPost.Add(postModelOut);
                    }
                    else
                    {
                        postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                    }
                }
                else
                {
                    postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                    postViewModelOut.ErrorMessage = MessageUtils.ERROR_DONT_HAVE_PERMISSION;
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.ToString();
            }
            return postViewModelOut;
        }
    }
}

