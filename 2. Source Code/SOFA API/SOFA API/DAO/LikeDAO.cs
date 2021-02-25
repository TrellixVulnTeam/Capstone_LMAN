﻿using SOFA_API.Common;
using System;
using System.Collections.Generic;
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
            result = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { postID, accountLike });
            return result;
        }
    }

}