using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Message
{
    public class MessageViewModelIn : BaseModelIn
    {
        public int ID { get; set; }
        public int FromAccountId { get; set; }
        public int ToAccountId { get; set; }
        public string Content { get; set; }
        public bool SenderDeleted { get; set; }
        public bool ReceiverDeleted { get; set; }
        public bool IsRead { get; set; }
        public int ConversationId { get; set; }
        public DateTime Time { get; set; }
        public string ImageUrl { get; set; }

        public MessageViewModelIn() : base() { }

        public MessageViewModelIn(int iD, int fromAccountId, int toAccountId, string content, bool senderDeleted, bool receiverDeleted, bool isRead, int conversationId, DateTime time, string imageUrl) : base()
        {
            this.ID = iD;
            this.FromAccountId = fromAccountId;
            this.ToAccountId = toAccountId;
            this.Content = content;
            this.SenderDeleted = senderDeleted;
            this.ReceiverDeleted = receiverDeleted;
            this.IsRead = isRead;
            this.ConversationId = conversationId;
            this.Time = time;
            this.ImageUrl = imageUrl;
        }

        public MessageViewModelIn(DataRow row) : base()
        {
            this.ID = (int)row["Id"];
            this.FromAccountId = (int)row["FromAccountId"];
            this.ToAccountId = (int)row["ToAccountId"];
            this.Content = row["Content"].ToString();
            this.SenderDeleted = (bool)row["SenderDeleted"];
            this.ReceiverDeleted = (bool)row["ReceiverDeleted"];
            this.IsRead = (bool)row["IsRead"];
            this.ConversationId = (int)row["ConversationId"];
            this.Time = (DateTime)row["Time"];
            this.ImageUrl = Convert.IsDBNull(row["Url"]) ? "" : row["url"].ToString();
        }
    }
}
