using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Feedback
{
    public class AdminFeedbackModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int UserFeedbackId { get; set; }
        public string LastUpdated { get; set; }
        public int Status { get; set; }
        public AdminFeedbackModel()
        {

        }

        public AdminFeedbackModel(DataRow row)
        {
            this.Id = (int)row["Id"];
            this.Username = row["Username"].ToString();
            this.Title = row["Title"].ToString();
            this.Content = Convert.IsDBNull(row["Content"]) ? "" : row["Content"].ToString();
            this.UserFeedbackId = (int)row["UserFeedbackId"];
            this.LastUpdated = row["LastUpdated"].ToString();
            this.Status = (int)row["Status"];
        }
    }
}
