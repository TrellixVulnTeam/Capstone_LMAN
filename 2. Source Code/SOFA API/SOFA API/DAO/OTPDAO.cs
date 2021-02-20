using SOFA_API.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class OTPDAO
    {
        private static OTPDAO instance;
        public static OTPDAO Instance
        {
            get
            {
                if (instance == null) instance = new OTPDAO();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }
        public OTPDAO() { }

        /// <summary>
        /// Get OTP from database by ID
        /// </summary>
        /// <param name="id">ID of OTP code</param>
        /// <returns>OTP</returns>
        public OTP GetOTPByID(int id)
        {
            OTP otp = null;
            string sql = "SELECT * FROM OTP Where id = " + id;
            DataTable data = DataProvider.Instance.ExecuteQuery(sql);
            if (data.Rows.Count > 0)
            {
                otp = new OTP(data.Rows[0]);
            }
            return otp;
        }
        /// <summary>
        /// Add OTP into database
        /// </summary>
        /// <param name="otp">Code includes 6 digits</param>
        /// <returns>ID of OTP that just insert to database</returns>
        public int AddOTP(int otp)
        {
            int ID = 0;

            string sql = "EXEC dbo.AddOTP @code";
            ID = (int)DataProvider.Instance.ExecuteScalar(sql, new object[] { otp });

            return ID;
        }
        /// <summary>
        /// Delete OTP from database by ID
        /// </summary>
        /// <param name="id">ID of OTP code</param>
        /// <returns>Status of transaction. 0 if failed, 1 if successfully.</returns>
        public int DeleteOTP(int id)
        {
            int res = 0;
            string sql = "EXEC dbo.DeleteOTP @id";
            res = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { id });
            return res;
        }
    }
}
