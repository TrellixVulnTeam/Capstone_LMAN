using SOFA_API.Common;
using SOFA_API.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class PostImageDAO
    {
        private static PostImageDAO instance;
        public static PostImageDAO Instance
        {
            get
            {
                if (instance == null) instance = new PostImageDAO();
                return instance;
            }
            private set { instance = value; }
        }
        /// <summary>
        /// Get List image of post
        /// </summary>
        /// <param name="postID">ID of the post</param>
        /// <returns>An image list</returns>
        public List<Image> GetPostImages(int postID)
        {
            List<Image> listImages = new List<Image>();
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
        /// Get image by image by id
        /// </summary>
        /// <param name="id">ID of image</param>
        /// <returns>An image</returns>
        public Image GetImageByID(int id)
        {
            Image image = null;

            string sql = "EXEC dbo.GetImagePostByID @id";

            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { id });
            if (data.Rows.Count > 0)
            {
                image = new Image(data.Rows[0]);
            }

            return image;
        }
        /// <summary>
        /// Add a new image of post into database
        /// </summary>
        /// <param name="image">Data of the image</param>
        /// <returns>Image that just inserted into database</returns>
        public Image AddImagePost(Image image)
        {
            Image res = null;

            string sql = "EXEC dbo.AddImagePost @postID , @url";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { image.PostID, image.Url });
            if (data.Rows.Count > 0)
            {
                res = new Image(data.Rows[0]);
            }
            return res;
        }
        /// <summary>
        /// Update data of an image
        /// </summary>
        /// <param name="imageID">ID of the image</param>
        /// <param name="url">Url of the image that you want to update</param>
        /// <returns>1 if successfully 0 if failed</returns>
        public int UpdateImage(int imageID, string url)
        {
            int res = 0;
            string sql = "EXEC dbo.UpdateImage @imageID , @url";
            res = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { imageID, url });
            return res;
        }
        public List<Image> AddListImagePost(List<Image> images)
        {
            List<Image> listImage = new List<Image>();
            foreach (Image image in images)
            {
                listImage.Add(AddImagePost(image));
            }
            return listImage;
        }
        public int DeleteImagePostByImageID(int id)
        {
            string sql = "EXEC dbo.DeleteImagePostByImageID @imageID";

            return DataProvider.Instance.ExecuteNonQuery(sql, new object[] { id });
        }
        public int DeleteAllImagesPostByPostID(int postID)
        {
            string sql = "EXEC dbo.DeleteAllImagesPostByPostID @postID";

            return DataProvider.Instance.ExecuteNonQuery(sql, new object[] { postID });
        }
    }
}
