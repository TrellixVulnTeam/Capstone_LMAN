using SOFA_API.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class MarkupPostDAO
    {
        private static MarkupPostDAO instance;
        public static MarkupPostDAO Instance
        {
            get
            {
                if (instance == null) instance = new MarkupPostDAO();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }
        /// <summary>
        /// Add markup post
        /// </summary>
        /// <param name="postID">ID of the post </param>
        /// <param name="accountID">ID of the account</param>
        /// <returns>Data of markup post</returns>
        public MarkupPost AddMarkupPost(int postID, int accountID)
        {
            MarkupPost markupPost = new MarkupPost();
            string sql = "EXEC dbo.AddMarkupPost @postID , @accountID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { postID, accountID });
            if (data.Rows.Count > 0)
            {
                markupPost = new MarkupPost(data.Rows[0]);
            }
            return markupPost;
        }
        /// <summary>
        /// Get all markup post in database
        /// </summary>
        /// <param name="page">Current page</param>
        /// <param name="rowsOfPage">Number items in one page</param>
        /// <returns>List markup post</returns>
        public List<Post> GetAllMarkupPost(int page, int rowsOfPage)
        {
            List<Post> markupPosts = new List<Post>();

            string sql = "EXEC dbo.GetAllMarkupPost @page , @rowsOfPage";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { page, rowsOfPage });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    markupPosts.Add(new Post(row));
                }
            }
            return markupPosts;
        }
        /// <summary>
        /// Get all markup post of an user in database
        /// </summary>
        /// <param name=""
        /// <param name="page">Current page</param>
        /// <param name="rowsOfPage">Number items in one page</param>
        /// <returns>List markup post</returns>
        public List<Post> GetMarkupPostOfUser(int accountID, int page, int rowsOfPage)
        {
            List<Post> markupPosts = new List<Post>();

            string sql = "EXEC dbo.GetMarkupPostOfUser @accountID , @page , @rowsOfPage";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountID, page, rowsOfPage });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    markupPosts.Add(new Post(row));
                }
            }
            return markupPosts;
        }

        public int DeleteMarkupPost(int postID, int accountID)
        {
            int res = 0;
            string sql = "EXEC dbo.DeleteMarkupPost @postID , @accountID";
            res = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { postID, accountID });
            return res;
        }
        public MarkupPost GetMarkupPostByPostIDAndAccountID(int postID, int accountID)
        {
            MarkupPost markupPost = null;

            string sql = "EXEC dbo.GetMarkupPostByPostIDAndAccountID @postID , @accountID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { postID, accountID });
            if (data.Rows.Count > 0)
            {
                markupPost = new MarkupPost(data.Rows[0]);
            }
            return markupPost;

        }
    }
}
