using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Feedback
{
    public class FeedbackViewModelIn : BaseModelIn
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int UserFeedbackId { get; set; }
        public string LastUpdated { get; set; }
        public int Status { get; set; }

        public FeedbackViewModelIn() : base()
        {

        }

        public FeedbackViewModelIn(string title, string content, int userFeedbackId, string lastUpdated, int status)
        {
            Title = title;
            Content = content;
            UserFeedbackId = userFeedbackId;
            LastUpdated = lastUpdated;
            Status = status;
        }

        public FeedbackViewModelIn(int id, string title, string content, int userFeedbackId, string lastUpdated, int status) : base()
        {
            this.Id = id;
            this.Title = title;
            this.Content = content;
            this.UserFeedbackId = userFeedbackId;
            this.LastUpdated = lastUpdated;
            this.Status = status;
        }
    }
}
