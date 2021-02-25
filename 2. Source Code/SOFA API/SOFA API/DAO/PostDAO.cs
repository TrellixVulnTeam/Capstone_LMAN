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

        public int CountLikeOfPost(int postID)
        {
            int numberOfLike = 0;
            String sql = "EXEC dbo.CountLikeOfPost @postID";
            try
            {
                numberOfLike = (int)DataProvider.Instance.ExecuteScalar(sql, new object[] { postID });
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
            }
            return numberOfLike;
        }

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

        public int GetPostRateAverage(int postID)
        {
            int avgRatePoint = 0;
            String sql = "EXEC dbo.GetPostRateAverage @postID";
            try
            {
                avgRatePoint = (int)DataProvider.Instance.ExecuteScalar(sql, new object[] { postID });

            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
            }
            return avgRatePoint;
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


        public int LikePost(int postID, int accountLike)
        {
            int result = 0;
            string sql = "EXEC dbo.LikePost @postID , @accountLike";
            result = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { postID, accountLike });
            return result;
        }

        public int RatePost(int postID, int accountLike, int ratePoint)
        {
            int result = 0;
            string sql = "EXEC dbo.CreateRate @postID , @accountRate , @ratePoint";
            result = (int)DataProvider.Instance.ExecuteNonQuery(sql, new object[] { postID, accountLike, ratePoint });
            return result;
        }

        public int CommentPost(int accountID, int postID, string content)
        {
            int result = 0;
            string sql = "EXEC dbo.CreateComment @accountID , @postID , @content";
            result = (int)DataProvider.Instance.ExecuteNonQuery(sql, new object[] { accountID, postID, content });
            return result;
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
