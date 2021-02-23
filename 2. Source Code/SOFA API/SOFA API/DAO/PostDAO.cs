using SOFA_API.Common;
using SOFA_API.DTO;
using SOFA_API.ViewModel.View_newsfeed;
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

        public PostViewModelOut getAllPost()
        {
            PostViewModelOut listAllPost = null;
            List<PostViewModelIn> listTemp = null;
            String sql = "SELECT * FROM POST";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql);
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        PostViewModelIn post = new PostViewModelIn(row);
                        listTemp.Add(post);
                    }
                    listAllPost = new PostViewModelOut(listTemp);
                }
            }catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
            }
            return listAllPost;
        }

        public int getPostLike(int postID)
        {
            int numberOfLike = 0;
            String sql = "SELECT COUNT(*) AS NumberOfLike FROM dbo.[Like] WHERE PostId = " + postID;
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql);
                if (data.Rows.Count > 0)
                {
                    numberOfLike = (int)(data.Rows[0]["NumberOfLike"]);
                }
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
            }
            return numberOfLike;
        }

        public int getPostComment(int postID)
        {
            int numberOfComment = 0;
            String sql = "SELECT COUNT(*) AS NumberOfComment FROM dbo.[Comment] WHERE PostId = " + postID;
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql);
                if (data.Rows.Count > 0)
                {
                    numberOfComment = (int)(data.Rows[0]["NumberOfComment"]);
                }
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
            }
            return numberOfComment;
        }

        public int getPostRate(int postID)
        {
            int avgRatePoint = 0;
            String sql = "SELECT AVG(RatePoint) AS AvgRate FROM dbo.[Rate] WHERE PostId = " + postID;
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql);
                if (data.Rows.Count > 0)
                {
                    avgRatePoint = (int)(data.Rows[0]["AvgRate"]);
                }
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
            }
            return avgRatePoint;
        }

        public List<Image> getPostImages(int postID)
        {
            List<Image> listImages = null;
            String sql = "SELECT * FROM dbo.[Image] WHERE PostId = " + postID;
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql);
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
    }
}
