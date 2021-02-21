using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

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
            ID = id;
            Content = content;
            PrivacyID = privacyID;
            Time = time;
            AccountPost = accountPost;
        }

        public Post(DataRow row)
        {
            ID = (int)row["Id"];
            Content = row["Content"].ToString();
            PrivacyID = (int)row["PrivacyID"];
            Time = (DateTime)row["Time"];
            AccountPost = (int)row["AccountPost"];
        }
    }
}
