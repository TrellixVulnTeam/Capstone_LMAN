using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.ViewModel.Feedback;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class FeedbackService
    {
        private static FeedbackService instance;

        public static FeedbackService Instance
        {
            get
            {
                if (instance == null) instance = new FeedbackService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }

        public FeedbackService()
        {
        }

        public FeedbackViewModelOut CreateNewFeedback(FeedbackViewModelIn feedbackIn)
        {
            FeedbackViewModelOut newFeedback = null;
            try
            {
                newFeedback = FeedbackDAO.Instance.CreateNewFeedback(feedbackIn);
                if(newFeedback != null)
                {
                    newFeedback.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    newFeedback = new FeedbackViewModelOut();
                    newFeedback.Code = Const.REQUEST_CODE_FAILED;
                    throw new Exception("Feedback failed!");
                }
            }
            catch (Exception e)
            {
                newFeedback = new FeedbackViewModelOut();
                newFeedback.ErrorMessage = e.ToString();
                newFeedback.Code = Const.REQUEST_CODE_FAILED;
            }
            return newFeedback;
        }
    }
}
