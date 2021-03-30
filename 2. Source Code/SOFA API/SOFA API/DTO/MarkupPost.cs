using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class MarkupPost
    {
        public int ID { get; set; }
        public int PostID { get; set; }
        public int AccountID { get; set; }

        public MarkupPost()
        {
        }

        public MarkupPost(int iD, int postID, int accountID)
        {
            ID = iD;
            PostID = postID;
            AccountID = accountID;
        }
        public MarkupPost(DataRow row)
        {
            ID = (int)row["ID"];
            PostID = (int)row["PostID"];
            AccountID = (int)row["AccountID"];
        }
    }
}
