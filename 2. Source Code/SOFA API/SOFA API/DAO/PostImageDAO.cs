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
        private PostImageDAO instance;
        public PostImageDAO Instance
        {
            get
            {
                if (instance == null) instance = new PostImageDAO();
                return instance;
            }
            private set { instance = value; }
        }

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

        public List<Image> GetImagesOfPost(int postID)
        {
            List<Image> images = new List<Image>();

            string sql = "EXEC dbo.GetImagesOfPostByPostID @id";

            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { postID });
            if (data.Rows.Count > 0)
            {
                for(int i = 0; i < data.Rows.Count; i++)
                {
                    images.Add(new Image(data.Rows[i]));
                }
            }

            return images;
        }
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
        public List<Image> AddListImagePost(List<Image> images)
        {
            List<Image> listImage = new List<Image>();
            foreach(Image image in images)
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
