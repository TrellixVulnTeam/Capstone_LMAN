using SOFA_API.Common;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Follow;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class FollowDAO
    {
        private static FollowDAO instance;

        public static FollowDAO Instance
        {
            get
            {
                if (instance == null) instance = new FollowDAO();
                return instance;
            }
            private set { instance = value; }
        }
        public FollowDAO()
        {

        }

        public int CountFollower(int userId)
        {
            int followCount = 0;
            string sql = "EXEC GetFollowerCount @userId";
            try
            {
                followCount = (int)DataProvider.Instance.ExecuteScalar(sql, new object[] { userId });
            }
            catch(Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return followCount;
        }

        public List<FollowerViewModelOut> GetListFollower(int userId)
        {
            List<FollowerViewModelOut> listFollower = new List<FollowerViewModelOut>();
            string sql = "EXEC GetListFollower @userId";
            string sqlGetUserProfile = "EXEC GetProfileByAccountID @userId ";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { userId });
                if (data.Rows.Count > 0)
                {
                    for(int i = 0; i<data.Rows.Count; i++)
                    {
                        int userId1 = (int)data.Rows[i]["AccountId1"];
                        DataTable record = DataProvider.Instance.ExecuteQuery(sqlGetUserProfile, new object[] { userId1 });
                        if(record.Rows.Count > 0)
                        {
                            FollowerViewModelOut follower = new FollowerViewModelOut(record.Rows[0]);
                            listFollower.Add(follower);
                        }
                    }
                }
            }
            catch(Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return listFollower;
        }

        public Follow FollowSomeone(int userId)
        {
            Follow fl = new Follow();
            string sql = "";
            return fl; 
        }

        public int UnfollowSomeone(int userId)
        {
            int result = 0;
            return result;
        }
    }
}
