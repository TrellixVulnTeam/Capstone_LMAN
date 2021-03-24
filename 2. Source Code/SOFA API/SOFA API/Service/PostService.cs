using Clarifai.Api;
using Google.Protobuf.Collections;
using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Newsfeed;
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
                    }
                    postViewModelOut.ListPost.Add(postModelOut);
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
                    }
                    postViewModelOut.ListPost.Add(postModelOut);
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
                    }
                    if (postModelOut.RateAverage > 3.5)
                    {
                        postViewModelOut.ListPost.Add(postModelOut);
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
                    CommentModelOut commentModelOut = new CommentModelOut();
                    commentModelOut.SetComment(comment);
                    commentModelOut.SetAccountComment(profile);
                    commentModelOuts.Add(commentModelOut);
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
                    }
                    postViewModelOut.ListPost.Add(postModelOut);
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
            int ID = 0;
            ID = LikeDAO.Instance.LikePost(postID, accountLike);
            PostViewModelOut result = new PostViewModelOut();
            try
            {
                if (ID != 0)
                {
                    PostModelOut postModelOut = new PostModelOut();
                    postModelOut.ID = postID;
                    postModelOut.NumberOfLike = LikeDAO.Instance.CountLikeOfPost(postID);
                    postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(postID, accountLike) != null;
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
            int ID = 0;
            ID = LikeDAO.Instance.UnLikePost(postID, accountLike);
            PostViewModelOut result = new PostViewModelOut();
            try
            {
                if (ID != 0)
                {
                    PostModelOut postModelOut = new PostModelOut();
                    postModelOut.ID = postID;
                    postModelOut.NumberOfLike = LikeDAO.Instance.CountLikeOfPost(postID);
                    postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(postID, accountLike) != null;
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
            int ID = 0;
            ID = RateDAO.Instance.RatePost(postID, accountLike, ratePoint);
            PostViewModelOut result = new PostViewModelOut();
            try
            {
                if (ID != 0)
                {
                    PostModelOut postModelOut = new PostModelOut();
                    postModelOut.ID = postID;
                    postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(postID);
                    postModelOut.MyRatePoint = RateDAO.Instance.GetRatingOfUser(postID, accountLike).RatePoint;
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
                Profile profile = ProfileDAO.Instance.GetProfileByAccountID(post.AccountPost);
                postModelOut.SetPostDetail(post);
                postModelOut.SetAccountPost(profile);
                postModelOut.ListLike = LikeDAO.Instance.GetAllLikeOfPost(postViewModelIn.PostID);

                List<Comment> comments = CommentDAO.Instance.GetAllCommentOfPost(postViewModelIn.PostID, 1, commentRowsOfPage);
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
                postModelOut.ListRate = RateDAO.Instance.GetListOfRate(postViewModelIn.PostID);
                postModelOut.ListImage = PostImageDAO.Instance.GetPostImages(postViewModelIn.PostID);
                postModelOut.NumberOfComment = postModelOut.ListComment.Count;
                postModelOut.NumberOfLike = postModelOut.ListLike.Count;
                postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(postViewModelIn.PostID);
                if (userID != 0)
                {
                    postModelOut.IsLiked = LikeDAO.Instance.GetLikeOfUserForPost(post.ID, userID) != null;
                    Rate rateTemp = RateDAO.Instance.GetRatingOfUser(post.ID, userID);
                    postModelOut.MyRatePoint = rateTemp != null ? rateTemp.RatePoint : 0;
                }
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
            try
            {
                if (comment != null && comment.ID > 0)
                {
                    PostModelOut postModelOut = new PostModelOut();
                    postModelOut.ID = postID;
                    List<CommentModelOut> commentModelOuts = new List<CommentModelOut>();
                    Profile profileComment = ProfileDAO.Instance.GetProfileByAccountID(comment.AccountID);
                    CommentModelOut commentModelOut = new CommentModelOut();
                    commentModelOut.SetComment(comment);
                    commentModelOut.SetAccountComment(profileComment);
                    commentModelOuts.Add(commentModelOut);

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
                Post post = new Post(0, postViewModelIn.Content, postViewModelIn.PrivacyID, postViewModelIn.Time, postViewModelIn.AccountPost, postViewModelIn.BodyInfoID, false);
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
                    ValidatePost(postModelOut);
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
        public object ValidatePost(PostModelOut postModelOut)
        {

            ClarifaiUtils clarifaiUtils = new ClarifaiUtils();
            for (int i = 0; i < postModelOut.ListImage.Count; i++)
            {
                RepeatedField<Concept> listConcept = clarifaiUtils.ModeratationImage("https://chientranhvietnam.org/assets/" + postModelOut.ListImage[i].Url);
                if (listConcept[0].Name != "safe")
                {
                    return listConcept;
                }
            }
            int res = PostDAO.Instance.UpdatePost(postModelOut.ID, postModelOut.Content, postModelOut.PrivacyID, postModelOut.Time, postModelOut.BodyInfoID, true);
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

    }
}
