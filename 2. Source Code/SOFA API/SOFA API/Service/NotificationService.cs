using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Notification;
using SOFA_API.ViewModel.Profile;
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

        public ListNotificationViewModelOut GetNotificationByToAccount(int accountID, int page, int rowOfPage)
        {
            ListNotificationViewModelOut listNotification = new ListNotificationViewModelOut();
            try
            {
                listNotification = NotificationDAO.Instance.GetNotificationByToAccount(accountID, page, rowOfPage);
                if (listNotification != null)
                {
                    listNotification.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    listNotification.Code = Const.REQUEST_CODE_FAILED;
                    throw new Exception("Can't get Notification");
                }
                //NotificationDAO.Instance.SetReadNotificationByAccountId(accountID);
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                listNotification.Code = Const.REQUEST_CODE_FAILED;
                listNotification.ErrorMessage = ex.Message;
            }
            return listNotification;
        }

        public ListNotificationViewModelOut GetUnreadNotificationByToAccount(int accountID, int page, int rowOfPage)
        {
            ListNotificationViewModelOut listNotification = new ListNotificationViewModelOut();
            try
            {
                listNotification = NotificationDAO.Instance.GetUnreadNotificationByToAccount(accountID, page, rowOfPage);
                if (listNotification != null)
                {
                    listNotification.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    listNotification.Code = Const.REQUEST_CODE_FAILED;
                    throw new Exception("Can't get Notification");
                }
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                listNotification.Code = Const.REQUEST_CODE_FAILED;
                listNotification.ErrorMessage = ex.Message;
            }
            return listNotification;
        }

        public NotificationViewModelOut CreatedNotification(NotificationViewModelIn modelIn)
        {
            NotificationViewModelOut notificationViewModelOut = new NotificationViewModelOut();
            try
            {
                Post post = PostDAO.Instance.GetPostByID(modelIn.PostId);

                switch (modelIn.TypeNotification)
                {
                    case Const.NOTIFICATION_TYPE_LIKE:
                        modelIn.Content = Const.NOTIFICATION_CONTENT_LIKE;
                        modelIn.ToAccount = post.AccountPost;
                        break;
                    case Const.NOTIFICATION_TYPE_COMMENT:
                        modelIn.Content = Const.NOTIFICATION_CONTENT_COMMENT;
                        modelIn.ToAccount = post.AccountPost;
                        break;
                    case Const.NOTIFICATION_TYPE_RATE:
                        modelIn.Content = Const.NOTIFICATION_CONTENT_RATE;
                        modelIn.ToAccount = post.AccountPost;
                        break;
                    case Const.NOTIFICATION_TYPE_FOLLOW:
                        modelIn.Content = Const.NOTIFICATION_CONTENT_FOLLOW;
                        break;
                    case Const.NOTIFICATION_TYPE_INVALID_IMAGE:
                        modelIn.Content = Const.NOTIFICATION_CONTENT_INVALID_IMAGE;
                        modelIn.ToAccount = post.AccountPost;
                        break;
                    default:
                        break;
                }

                modelIn.DateCreated = DateTime.Now;

                int result = 0;
                if (modelIn.FromAccount != modelIn.ToAccount)
                {
                    result = NotificationDAO.Instance.CreateNotification(modelIn);
                }

                notificationViewModelOut.TypeNotification = modelIn.TypeNotification;
                notificationViewModelOut.IsRead = false;
                notificationViewModelOut.PostId = modelIn.PostId;
                notificationViewModelOut.Content = modelIn.Content;
                notificationViewModelOut.FromAccount = modelIn.FromAccount;
                notificationViewModelOut.ToAccount = modelIn.ToAccount;
                notificationViewModelOut.DateCreated = modelIn.DateCreated;
                notificationViewModelOut.FromAccountName = "";

                ProfileViewModelOut profile = ProfileDAO.Instance.GetProfileModelByAccountID(modelIn.FromAccount);

                if (profile != null)
                {
                    notificationViewModelOut.FromAccountName = profile.LastName + " " + profile.FirstName;
                }
                else if (notificationViewModelOut.FromAccount == 0)
                {
                    notificationViewModelOut.FromAccountName = "Cảnh báo hệ thống";
                }
            }
            catch (Exception) { }

            return notificationViewModelOut;
        }

        public NotificationViewModelOut CreatedNotificationFollow(NotificationViewModelIn modelIn)
        {
            NotificationViewModelOut notificationViewModelOut = new NotificationViewModelOut();
            try
            {
                modelIn.TypeNotification = Const.NOTIFICATION_TYPE_FOLLOW;
                modelIn.Content = Const.NOTIFICATION_CONTENT_FOLLOW;
                modelIn.PostId = 0;
                modelIn.DateCreated = DateTime.Now;

                int result = NotificationDAO.Instance.CreateNotification(modelIn);

                notificationViewModelOut.TypeNotification = modelIn.TypeNotification;
                notificationViewModelOut.IsRead = false;
                notificationViewModelOut.PostId = modelIn.PostId;
                notificationViewModelOut.Content = modelIn.Content;
                notificationViewModelOut.FromAccount = modelIn.FromAccount;
                notificationViewModelOut.ToAccount = modelIn.ToAccount;
                notificationViewModelOut.DateCreated = modelIn.DateCreated;
                notificationViewModelOut.FromAccountName = "";

                ProfileViewModelOut profile = ProfileDAO.Instance.GetProfileModelByAccountID(modelIn.FromAccount);

                if (profile != null)
                {
                    notificationViewModelOut.FromAccountName = profile.LastName + " " + profile.FirstName;
                }
            }
            catch (Exception) { }

            return notificationViewModelOut;
        }

        public NotificationViewModelOut SetReadNotificationById(int ID)
        {
            NotificationViewModelOut notification = new NotificationViewModelOut();
            try
            {
                int result = NotificationDAO.Instance.SetReadNotificationById(ID);
                if (result == 1)
                {
                    notification.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    notification.Code = Const.REQUEST_CODE_FAILED;
                    throw new Exception("Can't update Notification");
                }
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                notification.Code = Const.REQUEST_CODE_FAILED;
                notification.ErrorMessage = ex.Message;
            }
            return notification;
        }

    }
}
