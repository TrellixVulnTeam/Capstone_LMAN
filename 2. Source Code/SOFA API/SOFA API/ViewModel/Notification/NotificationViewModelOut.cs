using SOFA_API.DAO;
using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Notification
{
    public class NotificationViewModelOut : BaseModelOut
    {
        public int Id { get; set; }
        public int TypeNotification { get; set; }
        public int TypeAction { get; set; }
        public bool IsRead { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; }
        public int FromAccount { get; set; }
        public string FromAccountName { get; set; }
        public string FromAccountAvatar { get; set; }
        public int ToAccount { get; set; }
        public string ToAccountName { get; set; }
        public DateTime DateCreated { get; set; }

        public NotificationViewModelOut() { }

        public NotificationViewModelOut(int id, int typeNotification, int typeAction, bool isRead, int postId, string content,
            int fromAccount, int toAccount, DateTime dateCreated)
        {
            Id = id;
            TypeNotification = typeNotification;
            TypeAction = typeAction;
            IsRead = isRead;
            PostId = postId;
            Content = content;
            FromAccount = fromAccount;
            ToAccount = toAccount;
            DateCreated = dateCreated;
        }

        public NotificationViewModelOut(DataRow row)
        {
            Id = (int)row["Id"];
            TypeNotification = (int)row["TypeNotification"];
            PostId = Convert.IsDBNull(row["PostID"]) ? 0 : (int)row["PostID"]; ;
            FromAccount = Convert.IsDBNull(row["FromAccount"]) ? 0 : (int)row["FromAccount"]; ;
            ToAccount = (int)row["ToAccount"];
            Content = row["Content"].ToString();
            IsRead = Convert.IsDBNull(row["IsRead"]) ? false : (bool)row["Isread"];
            DateCreated = (DateTime)row["DateCreated"];
            SetFromProfile(FromAccount);
            ToAccountName = GetProfileFullName(ToAccount);
        }

        private string GetProfileFullName(int accountID)
        {
            if (accountID == 1)
            {
                return "Hệ thống";
            }
            else
            {
                DTO.Profile profile = ProfileDAO.Instance.GetProfileByAccountID(accountID);
                if (profile != null)
                {
                    return profile.FirstName + " " + profile.LastName;
                }
                else
                {
                    return "";
                }
            }
        }
        private void SetFromProfile(int accountID)
        {
            if (accountID == 1)
            {
                FromAccountName = "Quản trị viên";
                FromAccountAvatar = "system/avatar/ava.png";
            }
            else
            {
                DTO.Profile profile = ProfileDAO.Instance.GetProfileByAccountID(accountID);
                if (profile != null)
                {
                    FromAccountName = profile.FirstName + " " + profile.LastName;
                    FromAccountAvatar = profile.AvatarUri;
                }
                else
                {
                    FromAccountName = "";
                    FromAccountAvatar = "";
                }
            }
        }
    }
}
