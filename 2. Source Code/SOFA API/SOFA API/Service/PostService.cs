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

        public PostViewModelOut getAllPost()
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();

            try
            {
                List<Post> listAllPost = PostDAO.Instance.GetAllPost();

                foreach (Post item in listAllPost)
                {
                    PostModelOut postModelOut = new PostModelOut();
                    postModelOut.SetPostDetail(item);
                    postModelOut.NumberOfLike = LikeDAO.Instance.CountLikeOfPost(item.ID);
                    postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(item.ID);
                    postModelOut.NumberOfComment = CommentDAO.Instance.CountCommentOfPost(item.ID);
                    postModelOut.ListImage = PostDAO.Instance.GetPostImages(item.ID);
                    postViewModelOut.ListPost.Add(postModelOut);
                }
                postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
            }
            return postViewModelOut;
        }

        public PostViewModelOut LikePost(int postID, int accountLike)
        {
            int ID = 0;
            ID = LikeDAO.Instance.LikePost(postID, accountLike);
            PostViewModelOut result = new PostViewModelOut();
            if (ID != 0)
            {
                result.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                result.Code = Const.REQUEST_CODE_FAILED;
            }
            return result;
        }

        public PostViewModelOut RatePost(int postID, int accountLike, int ratePoint)
        {
            int ID = 0;
            ID = RateDAO.Instance.RatePost(postID, accountLike, ratePoint);
            PostViewModelOut result = new PostViewModelOut();
            if (ID != 0)
            {
                result.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                result.Code = Const.REQUEST_CODE_FAILED;
            }
            return result;
        }
        /// <summary>
        /// Service process get detail of a post
        /// </summary>
        /// <param name="postViewModelIn">Include ID of the post(postID)</param>
        /// <returns>PostViewModelOut include list of the post </returns>
        public PostViewModelOut GetPostDetail(PostViewModelIn postViewModelIn)
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
                postModelOut.ListComment = CommentDAO.Instance.GetAllCommentOfPost(postViewModelIn.PostID);
                postModelOut.ListRate = RateDAO.Instance.GetListOfRate(postViewModelIn.PostID);
                postModelOut.ListImage = PostImageDAO.Instance.GetImagesOfPost(postViewModelIn.PostID);
                postModelOut.NumberOfComment = postModelOut.ListComment.Count;
                postModelOut.NumberOfLike = postModelOut.ListLike.Count;
                postModelOut.RateAverage = RateDAO.Instance.GetPostRateAverage(postViewModelIn.PostID);
                postViewModelOut.ListPost.Add(postModelOut);
                postViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
            }
            return postViewModelOut;
        }

        public PostViewModelOut CommentPost(int accountID, int postID, string content)
        {
            int ID = 0;
            ID = CommentDAO.Instance.CommentPost(accountID, postID, content);
            PostViewModelOut result = new PostViewModelOut();
            if (ID != 0)
            {
                result.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                result.Code = Const.REQUEST_CODE_FAILED;
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
                Post post = new Post(0, postViewModelIn.Content, postViewModelIn.PrivacyID, postViewModelIn.Time, postViewModelIn.AccountPost);
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
                            Image image = new Image(post.ID, "");
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
                }
                else
                {
                    postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                }
            }
            catch (Exception e)
            {
                postViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                postViewModelOut.ErrorMessage = e.Message;
            }
            return postViewModelOut;

        }

    }
}
