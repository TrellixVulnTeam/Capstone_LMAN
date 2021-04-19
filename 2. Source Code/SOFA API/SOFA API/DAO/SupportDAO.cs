﻿using SOFA_API.Common;
using SOFA_API.ViewModel.Support;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class SupportDAO
    {
        private static SupportDAO instance;

        public static SupportDAO Instance
        {
            get
            {
                if (instance == null) instance = new SupportDAO();
                return instance;
            }
            private set { instance = value; }
        }
        public SupportDAO()
        {

        }

        /// <summary>
        /// Function to create new support request
        /// </summary>
        /// <param name="supportRequest"></param>
        /// <returns>a new request</returns>
        public SupportRequestViewModelOut CreateSupportRequest(SupportRequestViewModelIn supportRequest)
        {
            SupportRequestViewModelOut newRequest = null;
            string sql = "EXEC CreateNewSupportRequest @requestType , @userRequestId , @timeCreate , @status , @respone";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { supportRequest.RequestType, supportRequest.UserRequestId, supportRequest.TimeCreate, supportRequest.Status, supportRequest.Respone });
                if (data.Rows.Count > 0)
                {
                    newRequest = new SupportRequestViewModelOut(data.Rows[0]);
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return newRequest;
        }

        /// <summary>
        /// Function get support request
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="requestType"></param>
        /// <returns>A Support Request</returns>
        public SupportRequestViewModelOut GetSupportRequest(int userId, int requestType)
        {
            SupportRequestViewModelOut request = new SupportRequestViewModelOut();
            string sql = "EXEC GetSupportRequest @userId , @requestType";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { userId, requestType});
                if (data.Rows.Count > 0)
                {
                    request = new SupportRequestViewModelOut(data.Rows[0]);
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return request;
        }

        /// <summary>
        /// Function to check if someone is fashionista
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool CheckFashionista(int userId)
        {
            string sql = "Select IsFashionista from Profile where AccountId = " + userId;
            bool isFashionista = false;
            try
            {
                isFashionista = (bool)DataProvider.Instance.ExecuteScalar(sql);
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return isFashionista;
        }

        public List<DetailUserSupportModel> GetAllUserSupportRequest()
        {
            List<DetailUserSupportModel> list = new List<DetailUserSupportModel>();
            string sql = "EXEC GetDetailUserSupport";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] {});
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        list.Add(new DetailUserSupportModel(row));
                    }
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return list;
        }

        public int SetUserFashionistaRequest(int requestId, int userId)
        {
            int result = 0;
            try
            {
                string sql = "EXEc [dbo].[SetUserIsFashionista] @RequestId , @userId";
                result = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { requestId, userId });
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                throw ex;
            }
            return result;
        }

        public int SetUserLockAccountRequest(int requestId, int userId)
        {
            int result = 0;
            try
            {
                string sql = "EXEc [dbo].[SetUserLockAcount] @RequestId , @userId";
                result = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { requestId, userId });
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                throw ex;
            }
            return result;
        }

        public int RejectSupportRequest(int requestId)
        {
            int result = 0;
            try
            {
                string sql = "EXEc [dbo].[RejectSupportRequest] @RequestId";
                result = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { requestId});
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                throw ex;
            }
            return result;
        }
    }
}
