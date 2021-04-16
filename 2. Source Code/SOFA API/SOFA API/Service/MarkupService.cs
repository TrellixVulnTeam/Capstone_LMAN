using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel.MarkupPost;
using SOFA_API.ViewModel.Newsfeed;

namespace SOFA_API.Service
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkupService : ControllerBase
    {
        private static MarkupService instance;
        public static MarkupService Instance
        {
            get
            {
                if (instance == null) instance = new MarkupService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }
        public MarkupViewModelOut AddMarkedPost(int postID, int accountID)
        {
            MarkupViewModelOut markupViewModelOut = new MarkupViewModelOut();
            try
            {
                MarkupPost markedPost = MarkupPostDAO.Instance.AddMarkupPost(postID, accountID);
                if (markedPost.ID > 0)
                {
                    MarkupModelOut markupModelOut = new MarkupModelOut();
                    markupModelOut.SetMarkupPost(markedPost);
                    markupViewModelOut.ListMarkup.Add(markupModelOut);
                    markupViewModelOut.ListMarkup.Add(markupModelOut);
                }
                else
                {
                    markupViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                }
                markupViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                markupViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                markupViewModelOut.ErrorMessage = e.ToString();
            }
            return markupViewModelOut;
        }

        public MarkupViewModelOut UnmarkedPost(int postID, int accountID)
        {
            MarkupViewModelOut markupViewModelOut = new MarkupViewModelOut();

            try
            {
                int res = MarkupPostDAO.Instance.DeleteMarkupPost(postID, accountID);
                if (res > 0)
                {
                    markupViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    MarkupModelOut markupModelOut = new MarkupModelOut();
                    markupModelOut.SetMarkupPost(new MarkupPost(0, postID, accountID));
                    markupViewModelOut.ListMarkup.Add(markupModelOut);
                }
                else
                {
                    markupViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                markupViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                markupViewModelOut.ErrorMessage = e.ToString();
            }

            return markupViewModelOut;
        }

        public PostViewModelOut GetUserMarkupPost(int userID, int page, int rowsOfPage)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();

            try
            {
                List<Post> listAllPost = MarkupPostDAO.Instance.GetMarkupPostOfUser(userID, page, rowsOfPage);

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
                        MarkupPost markupPost = MarkupPostDAO.Instance.GetMarkupPostByPostIDAndAccountID(item.ID, userID);
                        postModelOut.IsMarked = markupPost != null ? true : false;
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
        public PostViewModelOut GetAllMarkupPost(int userID, int page, int rowsOfPage)
        {
            PostViewModelOut postViewModelOut = new PostViewModelOut();

            try
            {
                List<Post> listAllPost = MarkupPostDAO.Instance.GetAllMarkupPost(page, rowsOfPage);

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
                        MarkupPost markupPost = MarkupPostDAO.Instance.GetMarkupPostByPostIDAndAccountID(item.ID, userID);
                        postModelOut.IsMarked = markupPost != null ? true : false;
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
    }
}
