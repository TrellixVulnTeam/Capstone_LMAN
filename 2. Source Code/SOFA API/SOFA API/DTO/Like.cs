
using System.Data;

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
            this.PostID = postID;
            this.AccountLike = accountLike;
        }

        public Like(DataRow row)
        {
            this.ID = (int)row["Id"];
            this.PostID = (int)row["PostId"];
            this.AccountLike = (int)row["AccountLike"];
        }
    }
}
