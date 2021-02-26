
using System.Data;

namespace SOFA_API.DTO
{
    public class Image
    {
        public int ID { get; set; }
        public int PostID { get; set; }
        public string Url { get; set; }
        
        public Image() { }

        public Image(int postID, string url)
        {
            ID = 0;
            PostID = postID;
            Url = url;
        }

        public Image(DataRow row)
        {
            ID = (int)row["Id"];
            PostID = (int)row["PostId"];
            Url = row["Url"].ToString();
        }
    }
}
