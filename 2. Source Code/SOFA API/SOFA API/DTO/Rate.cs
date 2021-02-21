using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

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
            PostID = postID;
            AccountRate = accountRate;
            RatePoint = ratePoint;
        }

        public Rate(DataRow row)
        {
            ID = (int)row["Id"];
            PostID = (int)row["PostId"];
            AccountRate = (int)row["AccountRate"];
            RatePoint = (int)row["RatePoint"];
        }
    }
}
