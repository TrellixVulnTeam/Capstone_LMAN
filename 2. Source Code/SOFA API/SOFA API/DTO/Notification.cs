using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Notification
    {
        public int Id { get; set; }
        public int TypeNotification { get; set; }
        public int TypeAction { get; set; }
        public bool IsRead { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; }
        public int FromAccount { get; set; }
        public int ToAccount { get; set; }

        public Notification() { }

        public Notification(int id, int typeNotification, int typeAction, bool isRead, int postId, string content,
            int fromAccount, int toAccount)
        {
            Id = id;
            TypeNotification = typeNotification;
            TypeAction = typeAction;
            IsRead = isRead;
            PostId = postId;
            Content = content;
            FromAccount = fromAccount;
            ToAccount = toAccount;
        }

        public Notification (DataRow row)
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
