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

        public Post CreatePost(Post post)
        {
            Post res = null;

            string sql = "EXEC dbo.AddNewPost @content , @privacyID , @time , @accountPost";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { post.Content, post.PrivacyID, post.Time, post.PrivacyID });

            if (data.Rows.Count > 0)
            {
                post = new Post(data.Rows[0]);
            }

            return res;
        }
    }
}
