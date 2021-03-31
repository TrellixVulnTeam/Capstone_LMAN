using SOFA_API.Common;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Newsfeed;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class LikeDAO
    {

        private static LikeDAO instance;

        public static LikeDAO Instance
        {
            get
            {
                if (instance == null) instance = new LikeDAO();
                return instance;
            }
            private set { instance = value; }
        }

        public LikeDAO() { }

        public int CountLikeOfPost(int postID)
        {
            int numberOfLike = 0;
            String sql = "EXEC dbo.CountLikeOfPost @postID";
            try
            {
                numberOfLike = (int)DataProvider.Instance.ExecuteScalar(sql, new object[] { postID });
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
            }
            return numberOfLike;
        }

        public int LikePost(int postID, int accountLike)
        {
            int result = 0;
            string sql = "EXEC dbo.LikePost @postID , @accountLike";
            result = (int)DataProvider.Instance.ExecuteScalar(sql, new object[] { postID, accountLike });
            return result;
        }
        public int UnLikePost(int postID, int accountLike)
        {
            int result = 0;
            string sql = "EXEC dbo.UnlikePost @postID , @accountLike";
            result = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { postID, accountLike });
            return result;
        }
        /// <summary>
        /// Get all like of the post by postID
        /// </summary>
        /// <param name="postID">Id of the post</param>
        /// <returns>A list of like</returns>
        public List<LikeModelOut> GetAllLikeOfPost(int postID)
        {
            List<LikeModelOut> likeModelOuts = new List<LikeModelOut>();
            string sql = "EXEC dbo.GetAllLikeOfPost @postID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { postID });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    Like like = new Like(row);
                    LikeModelOut likeModelOut = new LikeModelOut();
                    likeModelOut.SetLikeInfo(like);
                    Profile profile = ProfileDAO.Instance.GetProfileByAccountID(like.AccountLike);
                    likeModelOut.SetAccountLike(profile);
                    likeModelOuts.Add(likeModelOut);
                }
            }
            return likeModelOuts;
        }
        /// <summary>
        /// Get like of user for a post
        /// </summary>
        /// <param name="postID">ID of the post</param>
        /// <param name="accountID">ID of the account</param>
        /// <returns>An like object</returns>
        public Like GetLikeOfUserForPost(int postID, int accountID)
        {
            Like like = null;
            string sql = "EXEC dbo.GetLikeOfUserForPost @postID , @accountID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { postID, accountID });
            if (data.Rows.Count > 0)
            {
                like = new Like(data.Rows[0]);
            }
            return like;
        }
    }

}
