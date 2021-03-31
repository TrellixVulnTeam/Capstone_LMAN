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
        /// <summary>
        /// Function to get follower number
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>Number of follower</returns>
        public int GetFollowerNumber(int userId)
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

        /// <summary>
        /// Function to get list follower
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>List of Follower</returns>
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

        /// <summary>
        /// Function to follow someone
        /// </summary>
        /// <param name="followerId"></param>
        /// <param name="userGetFollowId"></param>
        /// <returns></returns>
        public FollowViewModelOut FollowSomeone(int followerId, int userGetFollowId)
        {
            FollowViewModelOut fl = new FollowViewModelOut();
            string sql = "EXEC FollowUser @followerId , @userGetFollowId";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { followerId, userGetFollowId });
                if(data.Rows.Count > 0)
                {
                    fl = new FollowViewModelOut(data.Rows[0]);
                }
            }
            catch(Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return fl; 
        }
        
        /// <summary>
        /// Function to unfollow someone
        /// </summary>
        /// <param name="followerId"></param>
        /// <param name="userGetFollowId"></param>
        /// <returns></returns>
        public int UnfollowSomeone(int followerId, int userGetFollowId)
        {
            int result = 0;
            string sql = "EXEC UnfollowUser @followerId , @userGetFollowId";
            try
            {
                result = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { followerId, userGetFollowId });
            }
            catch(Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return result;
        }

        /// <summary>
        /// Function to check if someone followed
        /// </summary>
        /// <param name="followerId"></param>
        /// <param name="userGetFollowId"></param>
        /// <returns>Return follwed result</returns>
        public bool CheckFollowed(int followerId, int userGetFollowId)
        {
            bool isFollowed = false;
            string sql = "EXEC CheckFollowed @followerId , @userGetFollowId";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { followerId, userGetFollowId });
                if(data.Rows.Count > 0)
                {
                    isFollowed = true;
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return isFollowed;
        }
    }
}
