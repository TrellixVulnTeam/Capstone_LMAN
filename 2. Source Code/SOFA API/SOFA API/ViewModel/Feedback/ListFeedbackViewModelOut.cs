using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Feedback
{
    public class ListFeedbackViewModelOut : BaseModelOut
    {
        public List<FeedbackViewModelOut> ListFeedback { get; set; }
        public ListFeedbackViewModelOut() : base()
        {
            ListFeedback = new List<FeedbackViewModelOut>();
        }
        public ListFeedbackViewModelOut(List<FeedbackViewModelOut> listFeedback) : base()
        {
            this.ListFeedback = listFeedback;
        }
    }
}
