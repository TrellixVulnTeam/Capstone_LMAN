using SOFA_API.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class InfoDAO
    {
        private static InfoDAO instance;
        public static InfoDAO Instance
        {
            get
            {
                if (InfoDAO.instance == null) InfoDAO.instance = new InfoDAO();
                return InfoDAO.instance;
            }
            private set
            {
                InfoDAO.instance = value;
            }
        }
        public InfoDAO() { }
        /// <summary>
        /// Get all body measurements in database
        /// </summary>
        /// <returns>List info</returns>
        public List<Info> GetAllInfo()
        {
            List<Info> infos = new List<Info>();
            string sql = "EXEC dbo.GetAllInfo";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql);
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    infos.Add(new Info(row));
                }
            }
            return infos;
        }

        /// <summary>
        /// Get all body measurements in database
        /// </summary>
        /// <param name="accountID">ID of account</param>
        /// <returns>List info of this user</returns>
        public List<Info> GetInfoOfAccount(int accountID)
        {
            List<Info> infos = new List<Info>();
            string sql = "EXEC dbo.GetInfoByAccountID @accountID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountID });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    infos.Add(new Info(row));
                }
            }
            return infos;
        }
        /// <summary>
        /// Get body measurement by id
        /// </summary>
        /// <param name="id">ID of the info</param>
        /// <returns>Data body measurements</returns>
        public Info GetInfoByID(int id)
        {
            Info info = null;

            string sql = "EXEC dbo.GetInfoByID @id";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { id });
            if (data.Rows.Count > 0)
            {
                info = new Info(data.Rows[0]);
            }

            return info;
        }
        /// <summary>
        /// Create new body measurements
        /// </summary>
        /// <param name="accountID">ID of account</param>
        /// <param name="height">Height of user</param>
        /// <param name="weight">Weight of user</param>
        /// <param name="bustSize">Bust size of user</param>
        /// <param name="waistSize">waist size of user</param>
        /// <param name="hipSize">hip size of user</param>
        /// <param name="skinColor">skin color of user</param>
        /// <returns></returns>
        public Info CreateInfo(int accountID, double height, double weight, double bustSize, double waistSize, double hipSize, int skinColor, string name)
        {
            Info info = null;
            string sql = "EXEC dbo.CreateInfo @accountID , @height , @weight , @bustSize , @waistSize , @hipSize , @skinColor , @name";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountID, height, weight, bustSize, waistSize, hipSize, skinColor, name });
            if (data.Rows.Count > 0)
            {
                info = new Info(data.Rows[0]);
            }

            return info;
        }

        /// <summary>
        /// Create new body measurements
        /// </summary>
        /// <param name="id">ID of info</param>
        /// <param name="height">Height of user</param>
        /// <param name="weight">Weight of user</param>
        /// <param name="bustSize">Bust size of user</param>
        /// <param name="waistSize">waist size of user</param>
        /// <param name="hipSize">hip size of user</param>
        /// <param name="skinColor">skin color of user</param>
        /// <returns></returns>
        public int UpdateInfo(int id, double height, double weight, double bustSize, double waistSize, double hipSize, int skinColor)
        {
            int res = 0;
            string sql = "EXEC dbo.UpdateInfo @id , @height , @weight , @bustSize , @waistSize , @hipSize , @skinColor";
            res = (int)DataProvider.Instance.ExecuteNonQuery(sql, new object[] { id, height, weight, bustSize, waistSize, hipSize, skinColor });
            return res;
        }
        /// <summary>
        /// Delete info by id
        /// </summary>
        /// <param name="id">ID of info</param>
        /// <returns></returns>
        public int DeleteInfoByID(int id)
        {
            int res = 0;
            string sql = "EXEC dbo.DeleteInfoByID @id";
            res = (int)DataProvider.Instance.ExecuteNonQuery(sql, new object[] { id });
            return res;
        }
        /// <summary>
        /// Delete info by id
        /// </summary>
        /// <param name="id">ID of info</param>
        /// <returns></returns>
        public int DeleteInfoOfUser(int accountID)
        {
            int res = 0;
            string sql = "EXEC dbo.DeleteInfoOfUser @accountID";
            res = (int)DataProvider.Instance.ExecuteNonQuery(sql, new object[] { accountID });
            return res;
        }

    }
}
