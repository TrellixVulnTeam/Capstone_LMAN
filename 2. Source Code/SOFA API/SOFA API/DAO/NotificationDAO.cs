using SOFA_API.ViewModel.Notification;
using System;
using System.Collections.Generic;
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

        public ListNotificationViewModelOut GetNotificationByToAccount(int accountId)
        {
            ListNotificationViewModelOut listNoti = new ListNotificationViewModelOut();
            string sql = "";
        }


    }
}
