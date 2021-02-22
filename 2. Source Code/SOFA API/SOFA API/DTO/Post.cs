using System;
using System.Data;


namespace SOFA_API.DTO
{
    public class Post
    {
        public int ID { get; set; }
        public string Content { get; set; }
        public int PrivacyID { get; set; }
        public DateTime Time { get; set; }
        public int AccountPost { get; set; }

        public Post() { }

        public Post(int id, string content, int privacyID, DateTime time, int accountPost)
        {
            this.ID = id;
            this.Content = content;
            this.PrivacyID = privacyID;
            this.Time = time;
            this.AccountPost = accountPost;
        }

        public Post(DataRow row)
        {
            this.ID = (int)row["Id"];
            this.Content = row["Content"].ToString();
            this.PrivacyID = (int)row["PrivacyID"];
            this.Time = (DateTime)row["Time"];
            this.AccountPost = (int)row["AccountPost"];
        }
    }
}
