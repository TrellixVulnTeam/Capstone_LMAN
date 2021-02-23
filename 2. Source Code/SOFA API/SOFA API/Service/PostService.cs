using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.ViewModel.View_newsfeed;
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
            PostViewModelOut listAllPost = PostDAO.Instance.getAllPost();
            foreach (PostViewModelIn item in listAllPost.ListPost)
            {
                item.NumberOfLike = PostDAO.Instance.getPostLike(item.ID);
                item.NumberOfRate = PostDAO.Instance.getPostRate(item.ID);
                item.NumberOfComment = PostDAO.Instance.getPostComment(item.ID);
                item.ListImage = PostDAO.Instance.getPostImages(item.ID);
            }

            if (listAllPost != null)
            {
                listAllPost.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                listAllPost.Code = Const.REQUEST_CODE_FAILED;
            }
            return listAllPost;
        }
    }
}
