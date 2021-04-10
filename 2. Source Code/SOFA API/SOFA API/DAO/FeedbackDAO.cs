using SOFA_API.Common;
using SOFA_API.ViewModel.Feedback;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class FeedbackDAO
    {
        private static FeedbackDAO instance;

        public static FeedbackDAO Instance
        {
            get
            {
                if (instance == null) instance = new FeedbackDAO();
                return instance;
            }
            private set { instance = value; }
        }
        public FeedbackDAO()
        {

        }

        /// <summary>
        /// Function to create a new feedback
        /// </summary>
        /// <param name="feedbackIn"></param>
        /// <returns>a new feedback</returns>
        public FeedbackViewModelOut CreateNewFeedback(FeedbackViewModelIn feedbackIn)
        {
            FeedbackViewModelOut newFeedback = null;
            try
            {
                string sql = "EXEC CreateNewFeedback @title , @content , @userFeedbackId , @lastUpdated , @status";
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { feedbackIn.Title, feedbackIn.Content, feedbackIn.UserFeedbackId, feedbackIn.LastUpdated, feedbackIn.Status });
                if (data.Rows.Count > 0)
                {
                    newFeedback = new FeedbackViewModelOut(data.Rows[0]);
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return newFeedback;
        }

        /// <summary>
        /// Function to get all feedback of an user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>List of feedback</returns>
        public ListFeedbackViewModelOut GetListFeedback(int userId)
        {
            ListFeedbackViewModelOut listFeedback = new ListFeedbackViewModelOut();
            string sql = "EXEC GetFeedbackByUserId @userId";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { userId });
                if(data.Rows.Count > 0)
                {
                    for(int i = 0; i < data.Rows.Count; i++)
                    {
                        FeedbackViewModelOut feedback = new FeedbackViewModelOut(data.Rows[i]);
                        listFeedback.ListFeedback.Add(feedback);
                    }
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return listFeedback;
        }
    }
}
