using SOFA_API.DTO;
using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.View_newsfeed
{
    public class PostViewModelOut: BaseModelOut
    {
        public int ID { get; set; }
        public string Content { get; set; }
        public int PrivacyID { get; set; }
        public DateTime Time { get; set; }
        public int AccountPost { get; set; }
        public int NumberOfLike { get; set; }
        public int NumberOfComment { get; set; }
        public int NumberOfRate { get; set; }
        public List<Image> ListImage { get; set; }

        public PostViewModelOut() : base() { }

        public PostViewModelOut(int id, string content, int privacyID, DateTime time, int accountPost,
            int numberOfLike, int numberOfComment, int numberOfRate, List<Image> listImage)
        {
            this.ID = id;
            this.Content = content;
            this.PrivacyID = privacyID;
            this.Time = time;
            this.AccountPost = accountPost;
            this.NumberOfLike = numberOfLike;
            this.NumberOfComment = numberOfComment;
            this.NumberOfRate = numberOfRate;
            this.ListImage = listImage;
        }

        public PostViewModelOut(DataRow row) : base()
        {
            this.ID = (int)row["Id"];
            this.Content = row["Content"].ToString();
            this.PrivacyID = (int)row["PrivacyID"];
            this.Time = (DateTime)row["Time"];
            this.AccountPost = (int)row["AccountPost"];
            this.NumberOfLike = 0;
            this.NumberOfComment = 0;
            this.NumberOfRate = 0;
            this.ListImage = null;
        }
    }
}
