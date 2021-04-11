using SOFA_API.Common;
using SOFA_API.DTO;
using System;
using System.Collections.Generic;
using System.Data;
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
        /// <summary>
        /// Count number comment of the post
        /// </summary>
        /// <param name="postID">ID of the post</param>
        /// <returns>An integer that is number of comment of the post</returns>
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
        /// <summary>
        /// Create new comment on a post
        /// </summary>
        /// <param name="accountID">ID of user who comment in the post</param>
        /// <param name="postID">ID of the post</param>
        /// <param name="content">Content of comment</param>
        /// <returns>1 if successfully, 0 if failed</returns>
        public Comment CommentPost(int accountID, int postID, string content)
        {
            Comment result = null;
            string sql = "EXEC dbo.CreateComment @accountID , @postID , @content";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountID, postID, content });
            if (data.Rows.Count > 0)
            {
                result = new Comment(data.Rows[0]);
            }
            return result;
        }
        /// <summary>
        /// Get all comment of the post
        /// </summary>
        /// <param name="postID">ID of the post</param>
        /// <returns>List of comment</returns>
        public List<Comment> GetAllCommentOfPost(int postID, int page, int rowsOfPage)
        {
            List<Comment> comments = new List<Comment>();
            string sql = "EXEC dbo.GetAllCommentOfPost @postID , @page , @rowsOfPage";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { postID, page, rowsOfPage });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    comments.Add(new Comment(row));
                }
            }

            return comments;
        }

        public List<Comment> GetAllCommentOfPostWithoutPaging(int postID)
        {
            List<Comment> comments = new List<Comment>();
            string sql = "EXEC dbo.GetAllCommentOfPostWithoutPaging @postID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { postID});
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    comments.Add(new Comment(row));
                }
            }

            return comments;
        }

    }
}
