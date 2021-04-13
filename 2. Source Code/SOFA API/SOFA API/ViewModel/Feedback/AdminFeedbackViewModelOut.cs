using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Feedback
{
    public class AdminFeedbackViewModelOut : BaseModelOut
    {
        public List<AdminFeedbackModel> ListFeedback { get; set; }

        public AdminFeedbackViewModelOut() : base()
        {
            ListFeedback = new List<AdminFeedbackModel>();
        }

        public AdminFeedbackViewModelOut(List<AdminFeedbackModel> listFeedback) : base()
        {
            ListFeedback = listFeedback;
        }
    }
}
