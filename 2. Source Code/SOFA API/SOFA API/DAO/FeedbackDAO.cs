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

        public FeedbackViewModelOut GetFeedbackById(int fid)
        {
            FeedbackViewModelOut feedback = null;
            string sql = "EXEC GetFeedbackById @feedbackId";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { fid });
                if (data.Rows.Count > 0)
                {
                    for (int i = 0; i < data.Rows.Count; i++)
                    {
                        feedback = new FeedbackViewModelOut(data.Rows[i]);
                    }
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return feedback;
        }

        public List<AdminFeedbackModel> GetAllUserFeedback()
        {
            List<AdminFeedbackModel> listFeedback = new List<AdminFeedbackModel>();
            string sql = "EXEC GetAllUserFeedback";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] {});
                if (data.Rows.Count > 0)
                {
                    for (int i = 0; i < data.Rows.Count; i++)
                    {
                        listFeedback.Add(new AdminFeedbackModel(data.Rows[i]));
                        
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

        public FeedbackViewModelOut UpdateFeedbackStatus(int feedbackId, DateTime lastUpdated)
        {
            FeedbackViewModelOut feedback = new FeedbackViewModelOut();
            try
            {
                string sql = "EXEC UpdateFeedbackStatus @feedbackId , @lastUpdated";
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { feedbackId, lastUpdated });
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return feedback;
        }
    }
}
