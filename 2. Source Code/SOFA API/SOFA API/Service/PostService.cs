using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Newsfeed;
using System;
using System.Collections.Generic;
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
        public PostViewModelOut CreateNewPost(PostViewModelIn postViewModelIn)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();
            Post post = new Post(0, postViewModelIn.Content, postViewModelIn.PrivacyID, postViewModelIn.Time, postViewModelIn.AccountPost);
            return postViewModelOut;

        }
    }
}
