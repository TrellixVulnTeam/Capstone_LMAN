
using System.Data;

namespace SOFA_API.DTO
{
    public class Rate
    {
        public int ID { get; set; }
        public int PostID { get; set; }
        public int AccountRate { get; set; }
        public int RatePoint { get; set; }

        public Rate() { }

        public Rate(int postID, int accountRate, int ratePoint)
        {
            this.PostID = postID;
            this.AccountRate = accountRate;
            this.RatePoint = ratePoint;
        }

        public Rate(DataRow row)
        {
            this.ID = (int)row["Id"];
            this.PostID = (int)row["PostId"];
            this.AccountRate = (int)row["AccountRate"];
            this.RatePoint = (int)row["RatePoint"];
        }
    }
}
