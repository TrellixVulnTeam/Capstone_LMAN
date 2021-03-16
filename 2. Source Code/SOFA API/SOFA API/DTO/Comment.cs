
using System;
using System.Data;


namespace SOFA_API.DTO
{
    public class Comment
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public int PostID { get; set; }
        public string Content { get; set; }
        public DateTime Time { get; set; }

        public Comment() { }

        public Comment(int accountID, int postID, string content, DateTime time)
        {
            this.AccountID = accountID;
            this.PostID = postID;
            this.Content = content;
            this.Time = time;
        }

        public Comment(DataRow row)
        {
            this.ID = (int)row["Id"];
            this.AccountID = (int)row["AccountId"];
            this.PostID = (int)row["PostId"];
            this.Content = row["content"].ToString();
            this.Time = (DateTime)row["time"];
        }
    }
}
