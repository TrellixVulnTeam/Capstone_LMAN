using SOFA_API.Common;
using SOFA_API.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class RateDAO
    {
        private static RateDAO instance;

        public static RateDAO Instance
        {
            get
            {
                if (instance == null) instance = new RateDAO();
                return instance;
            }
            private set { instance = value; }
        }

        public RateDAO() { }
        /// <summary>
        /// Get average rate point of the post
        /// </summary>
        /// <param name="postID">ID of the post</param>
        /// <returns>Average of rate point</returns>
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
        /// <summary>
        /// Create new rating of the post
        /// </summary>
        /// <param name="postID">ID of the post that user rate</param>
        /// <param name="accounRate">ID of the user who rate the post</param>
        /// <param name="ratePoint">Point rate the post</param>
        /// <returns>1 if successfully, 0 if failed</returns>
        public int RatePost(int postID, int accountRate, int ratePoint)
        {
            int result = 0;
            string sql = "EXEC dbo.CreateRate @postID , @accountRate , @ratePoint";
            result = (int)DataProvider.Instance.ExecuteNonQuery(sql, new object[] { postID, accountRate, ratePoint });
            return result;
        }
        /// <summary>
        /// Get all rate of the post
        /// </summary>
        /// <param name="postID">ID of the post</param>
        /// <returns>List of the rate</returns>
        public List<Rate> GetListOfRate(int postID)
        {
            List<Rate> rates = new List<Rate>();
            string sql = "EXEC dbo.GetAllRateOfPost @postID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { postID });
            if (data.Rows.Count > 0)
            {
                foreach(DataRow row in data.Rows)
                {
                    rates.Add(new Rate(row));
                }
            }
            return rates;
        }


    }
}
