using SOFA_API.Common;
using SOFA_API.ViewModel.Notification;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class NotificationDAO
    {
        private static NotificationDAO instance;

        public static NotificationDAO Instance
        {
            get
            {
                if (instance == null) instance = new NotificationDAO();
                return instance;
            }
            private set { instance = value; }
        }

        public ListNotificationViewModelOut GetNotificationByToAccount(int accountID, int page, int rowOfPage)
        {
            ListNotificationViewModelOut listNotification = new ListNotificationViewModelOut();
            string sql = "EXEC getNotificationByToAccount @accountID , @page , @rowOfPage ";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountID, page, rowOfPage });
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        listNotification.ListNoti.Add(new NotificationViewModelOut(row));
                    }
                }
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                throw ex;
            }
            return listNotification;
        }

        public int SetReadNotificationById(int ID)
        {
            string sql = "EXEC setReadNotificationById @ID";
            try
            {
                int result = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { ID});
                return result;
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                throw ex;
            }
        }

        public ListNotificationViewModelOut GetUnreadNotificationByToAccount(int accountID, int page, int rowOfPage)
        {
            ListNotificationViewModelOut listNotification = new ListNotificationViewModelOut();
            string sql = "EXEC getNotificationByToAccount @accountID, @page, @rowsOfPage ";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountID, page, rowOfPage });
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        if ((bool)row["IsRead"] == false)
                        {
                            listNotification.ListNoti.Add(new NotificationViewModelOut(row));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                throw ex;
            }
            return listNotification;
        }

        public int CreateNotification(NotificationViewModelIn modelIn)
        {
            string query = "EXEC AddNewNotification @TypeNotification , @PostId , @Content , @FromAccount , @ToAccount , @DateCreated";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { modelIn.TypeNotification, modelIn.PostId,
                 modelIn.Content, modelIn.FromAccount, modelIn.ToAccount, modelIn.DateCreated});
            return result;
        }

        public int AddNewNotificationFeedback(NotificationViewModelIn modelIn)
        {
            string query = "EXEC AddNewNotificationFeedback @TypeNotification , @Content , @FromAccount , @ToAccount , @DateCreated";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { modelIn.TypeNotification, modelIn.Content,
            modelIn.FromAccount, modelIn.ToAccount, modelIn.DateCreated});
            return result;
        }

    }
}
