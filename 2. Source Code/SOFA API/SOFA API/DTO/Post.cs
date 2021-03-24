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
        public int BodyInfoID { get; set; }
        public bool IsVerified { get; set; }

        public Post() { }

        public Post(int id, string content, int privacyID, DateTime time, int accountPost, int bodyInfoID, bool isVerified)
        {
            this.ID = id;
            this.Content = content;
            this.PrivacyID = privacyID;
            this.Time = time;
            this.AccountPost = accountPost;
            this.BodyInfoID = bodyInfoID;
            this.IsVerified = isVerified;
        }

        public Post(DataRow row)
        {
            this.ID = (int)row["Id"];
            this.Content = row["Content"].ToString();
            this.PrivacyID = (int)row["PrivacyID"];
            this.Time = (DateTime)row["Time"];
            this.AccountPost = (int)row["AccountPost"];
            this.BodyInfoID = Convert.IsDBNull(row["BodyInfoID"]) ? 0 : (int)row["BodyInfoID"];
            this.IsVerified = Convert.IsDBNull(row["IsVerified"]) ? false : (bool)row["IsVerified"];
        }
    }
}
