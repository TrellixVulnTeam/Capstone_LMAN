using SOFA_API.Common;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Newsfeed;
using System;
using System.Collections.Generic;
using System.Data;


namespace SOFA_API.DAO
{
    public class PostDAO
    {
        private static PostDAO instance;

        public static PostDAO Instance
        {
            get
            {
                if (instance == null) instance = new PostDAO();
                return instance;
            }
            private set { instance = value; }
        }

        public PostDAO() { }
        /// <summary>
        /// Get all post in database
        /// </summary>
        /// <returns>A list post</returns>
        public List<Post> GetAllPost(int page, int rowsOfPage)
        {
            List<Post> listAllPost = new List<Post>();

            String sql = "EXEC dbo.GetAllPublicPost @page , @rowsOfPage";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { page, rowsOfPage });
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        listAllPost.Add(new Post(row));
                    }
                }
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
            }
            return listAllPost;
        }
        /// <summary>
        /// Get all post in database
        /// </summary>
        /// <returns>A list post</returns>
        public List<Post> GetAllPostByInfoID(int infoID, int page, int rowsOfPage)
        {
            List<Post> listAllPost = new List<Post>();

            String sql = "EXEC dbo.GetPostByBodyInfoID @bodyInfoID , @page , @rowsOfPage";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { infoID, page, rowsOfPage });
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        listAllPost.Add(new Post(row));
                    }
                }
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
            }
            return listAllPost;
        }
        /// <summary>
        /// Create post in database
        /// </summary>
        /// <param name="post">data of the post</param>
        /// <returns>The post that just inserted into database</returns>
        public Post CreatePost(Post post)
        {
            Post res = null;

            string sql = "EXEC dbo.AddNewPost @content , @privacyID , @accountPost , @bodyInfoID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { post.Content, post.PrivacyID, post.AccountPost, post.BodyInfoID });

            if (data.Rows.Count > 0)
            {
                res = new Post(data.Rows[0]);
            }

            return res;
        }
        /// <summary>
        /// Get post detail by ID
        /// </summary>
        /// <param name="id">ID of post</param>
        /// <returns>A post</returns>
        public Post GetPostByID(int id)
        {
            Post res = null;
            string sql = "EXEC dbo.GetPostByID @postID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { id });
            if (data.Rows.Count > 0)
            {
                res = new Post(data.Rows[0]);
            }
            return res;
        }
        /// <summary>
        /// Get all public post of an user
        /// </summary>
        /// <param name="accountID">ID of that user</param>
        /// <returns>List of post</returns>
        public List<Post> GetAllPublicPostOfUser(int accountID, int page, int rowsOfPage)
        {
            List<Post> posts = new List<Post>();
            string sql = "EXEC dbo.GetAllPublicPostOfUser @accountPost , @page , @rowsOfPage";

            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountID, page, rowsOfPage });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    posts.Add(new Post(row));
                }
            }

            return posts;
        }
        /// <summary>
        /// Get all post of an user
        /// </summary>
        /// <param name="accountID">ID of that user</param>
        /// <returns>List of post</returns>
        public List<Post> GetAllPostOfUser(int accountID, int page, int rowsOfPage)
        {
            List<Post> posts = new List<Post>();
            string sql = "EXEC dbo.GetAllPostOfUser @accountPost , @page , @rowsOfPage";

            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountID, page, rowsOfPage });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    posts.Add(new Post(row));
                }
            }

            return posts;
        }
        /// <summary>
        /// Delete a post by post id
        /// </summary>
        /// <param name="postID">Id of the post</param>
        /// <returns>result > 0 if successfully, 0 if failed</returns>
        public int DeletePostByPostID(int postID)
        {
            int result = 0;

            string sql = "EXEC dbo.DeletePost @postID";

            result = (int)DataProvider.Instance.ExecuteNonQuery(sql, new object[] { postID });

            return result;
        }
    }
}
