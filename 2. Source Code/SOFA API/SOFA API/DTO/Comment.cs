using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Comment
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public int PostID { get; set; }
        public string Content { get; set; }

        public Comment() { }

        public Comment(int accountID, int postID, string content)
        {
            AccountID = accountID;
            PostID = postID;
            Content = content;
        }

        public Comment(DataRow row)
        {
            ID = (int)row["Id"];
            AccountID = (int)row["AccountId"];
            PostID = (int)row["PostId"];
            Content = row["content"].ToString();
        }
    }
}
