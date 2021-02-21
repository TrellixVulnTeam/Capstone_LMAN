using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Like
    {
        public int ID { get; set; }
        public int PostID { get; set; }
        public int AccountLike { get; set; }

        public Like() { }

        public Like(int postID, int accountLike)
        {
            PostID = postID;
            AccountLike = accountLike;
        }

        public Like(DataRow row)
        {
            ID = (int)row["Id"];
            PostID = (int)row["PostId"];
            AccountLike = (int)row["AccountLike"];
        }
    }
}
