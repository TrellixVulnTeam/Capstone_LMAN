using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.ViewModel.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class NotificationService
    {
        private static NotificationService instance;

        public static NotificationService Instance
        {
            get
            {
                if (instance == null) instance = new NotificationService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }

        public NotificationService() { }

        public ListNotificationViewModelOut GetNotificationByToAccount(int accountID)
        {
            ListNotificationViewModelOut listNotification = new ListNotificationViewModelOut();
            try
            {
                listNotification = NotificationDAO.Instance.GetNotificationByToAccount(accountID);
                if (listNotification != null)
                {
                    listNotification.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    listNotification.Code = Const.REQUEST_CODE_FAILED;
                    throw new Exception("Can't get Notification");
                }
            }catch(Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                listNotification.Code = Const.REQUEST_CODE_FAILED;
                listNotification.ErrorMessage = ex.Message;
            }
            return listNotification;
        }
    }
}
