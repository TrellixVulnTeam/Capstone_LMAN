using SOFA_API.Common;
using System;
using System.Collections.Generic;
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

        public int RatePost(int postID, int accountLike, int ratePoint)
        {
            int result = 0;
            string sql = "EXEC dbo.CreateRate @postID , @accountRate , @ratePoint";
            result = (int)DataProvider.Instance.ExecuteNonQuery(sql, new object[] { postID, accountLike, ratePoint });
            return result;
        }

    }
}
