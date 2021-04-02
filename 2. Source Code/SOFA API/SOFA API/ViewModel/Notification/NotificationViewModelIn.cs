using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Notification
{
    public class NotificationViewModelIn : BaseModelIn
    {
        public int Id { get; set; }
        public int TypeNotification { get; set; }
        public int TypeAction { get; set; }
        public bool IsRead { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; }
        public int FromAccount { get; set; }
        public int ToAccount { get; set; }
        public DateTime DateCreated { get; set; }

        public NotificationViewModelIn() { }

        public NotificationViewModelIn(int id, int typeNotification, int typeAction, bool isRead, int postId, string content,
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

        public NotificationViewModelIn(int typeNotification, int postId,
            int fromAccount)
        {
            TypeNotification = typeNotification;
            PostId = postId;
            FromAccount = fromAccount;
        }

        public NotificationViewModelIn(int fromAccount, int toAccount)
        {
            FromAccount = fromAccount;
            ToAccount = toAccount;
        }

        public NotificationViewModelIn(DataRow row)
        {
            Id = (int)row["Id"];
            TypeNotification = (int)row["TypeNotification"];
            TypeAction = (int)row["TypeAction"];
            PostId = (int)row["PostId"];
            FromAccount = (int)row["FromAccount"];
            ToAccount = (int)row["ToAccount"];
            Content = row["Content"].ToString();
            IsRead = (bool)row["IsRead"];
        }
    }
}
