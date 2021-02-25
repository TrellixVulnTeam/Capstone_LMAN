using SOFA_API.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class CommentDAO
    {
        private static CommentDAO instance;
        public static CommentDAO Instance
        {
            get
            {
                if (instance == null) instance = new CommentDAO();
                return instance;
            }
            private set { instance = value; }
        }

        public CommentDAO() { }

        public int CountCommentOfPost(int postID)
        {
            int numberOfComment = 0;
            String sql = "EXEC dbo.CountCommentOfPost @postID";
            try
            {
                numberOfComment = (int)DataProvider.Instance.ExecuteScalar(sql, new object[] { postID });
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
            }
            return numberOfComment;
        }

        public int CommentPost(int accountID, int postID, string content)
        {
            int result = 0;
            string sql = "EXEC dbo.CreateComment @accountID , @postID , @content";
            result = (int)DataProvider.Instance.ExecuteNonQuery(sql, new object[] { accountID, postID, content });
            return result;
        }

    }
}
