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
            MarkupPost markedPost = MarkupPostDAO.Instance.AddMarkupPost(postID, accountID);
            MarkupModelOut markupModelOut = new MarkupModelOut();
            markupModelOut.SetMarkupPost(markedPost);
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

        public MarkupViewModelOut GetUserMarkupPost(int userID, int page, int rowsOfPage)
        {
            MarkupViewModelOut markupViewModelOut = new MarkupViewModelOut();

            try
            {
                List<MarkupPost> markupPosts = MarkupPostDAO.Instance.GetMarkupPostOfUser(userID, page, rowsOfPage);
                foreach(MarkupPost markupPost in markupPosts)
                {
                    MarkupModelOut markupModelOut = new MarkupModelOut();
                    markupModelOut.SetMarkupPost(markupPost);
                    markupViewModelOut.ListMarkup.Add(markupModelOut);
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
        public MarkupViewModelOut GetAllMarkupPost(int page, int rowsOfPage)
        {
            MarkupViewModelOut markupViewModelOut = new MarkupViewModelOut();

            try
            {
                List<MarkupPost> markupPosts = MarkupPostDAO.Instance.GetAllMarkupPost(page, rowsOfPage);
                foreach (MarkupPost markupPost in markupPosts)
                {
                    MarkupModelOut markupModelOut = new MarkupModelOut();
                    markupModelOut.SetMarkupPost(markupPost);
                    markupViewModelOut.ListMarkup.Add(markupModelOut);
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
    }
}
