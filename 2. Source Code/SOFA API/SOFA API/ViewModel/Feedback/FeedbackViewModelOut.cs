using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Feedback
{
    public class FeedbackViewModelOut : BaseModelOut
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int UserFeedbackId { get; set; }
        public string LastUpdated { get; set; }
        public int Status { get; set; }

        public FeedbackViewModelOut() : base()
        {

        }
        public FeedbackViewModelOut(int id, string title, string content, int userFeedbackId, string lastUpdated, int status) : base()
        {
            this.Id = id;
            this.Title = title;
            this.Content = content;
            this.UserFeedbackId = userFeedbackId;
            this.LastUpdated = lastUpdated;
            this.Status = status;
        }
        public FeedbackViewModelOut(DataRow row) : base()
        {
            this.Id = (int)row["Id"];
            this.Title = row["Title"].ToString();
            this.Content = Convert.IsDBNull(row["Content"]) ? "" : row["Content"].ToString();
            this.UserFeedbackId = (int)row["UserFeedbackId"];
            this.LastUpdated = row["LastUpdated"].ToString();
            this.Status = (int)row["Status"];
        }
    }
}
