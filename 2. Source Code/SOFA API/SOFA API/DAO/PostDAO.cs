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
        public List<Post> GetAllPost()
        {
            List<Post> listAllPost = new List<Post>();

            String sql = "SELECT * FROM POST";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql);
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
        /// Get List image of post
        /// </summary>
        /// <param name="postID">ID of the post</param>
        /// <returns>An image list</returns>
        public List<Image> GetPostImages(int postID)
        {
            List<Image> listImages = null;
            String sql = "EXEC dbo.GetImagesOfPostByPostID @id";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { postID });
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        Image image = new Image(row);
                        listImages.Add(image);
                    }
                }
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
            }
            return listImages;
        }
        /// <summary>
        /// Create post in database
        /// </summary>
        /// <param name="post">data of the post</param>
        /// <returns>The post that just inserted into database</returns>
        public Post CreatePost(Post post)
        {
            Post res = null;

            string sql = "EXEC dbo.AddNewPost @content , @privacyID , @accountPost";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { post.Content, post.PrivacyID, post.AccountPost });

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
    }
}
