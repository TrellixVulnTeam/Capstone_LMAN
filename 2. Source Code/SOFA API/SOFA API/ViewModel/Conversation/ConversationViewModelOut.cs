using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SOFA_API.ViewModel.BaseModel;
using System.Data;

namespace SOFA_API.ViewModel.Conversation
{
    public class ConversationViewModelOut : BaseModelOut
    {
        public int AccountId { get; set; }
        public int ChatWithAccountId { get; set; }
        public DateTime TimeUpdate { get; set; }
        public string lastMessage { get; set; }
        public int lastSender { get; set; }
        public string ChatWithFirstName { get; set; }
        public string ChatWithLastName { get; set; }
        public string ChatWithAvatarUri { get; set; }
        public string ChatWithAvatar { get; set; }
        public bool IsReaded { get; set; }

        public ConversationViewModelOut()
        {
        }

        public ConversationViewModelOut(int accountId, int chatWithAccountId, DateTime timeUpdate, string lastMessage, int lastSender, string chatWithFirstName, string chatWithLastName, string chatWithAvatarUri, string chatWithAvatar, bool isReaded)
        {
            AccountId = accountId;
            ChatWithAccountId = chatWithAccountId;
            TimeUpdate = timeUpdate;
            this.lastMessage = lastMessage;
            this.lastSender = lastSender;
            ChatWithFirstName = chatWithFirstName;
            ChatWithLastName = chatWithLastName;
            ChatWithAvatarUri = chatWithAvatarUri;
            ChatWithAvatar = chatWithAvatar;
            IsReaded = isReaded;
        }

        public ConversationViewModelOut(DataRow row) : base()
        {
            this.AccountId = (int)row["AccountId"];
            this.ChatWithAccountId = (int)row["ChatWithAccountId"];
            this.TimeUpdate = Convert.IsDBNull(row["TimeUpdate"]) ? new DateTime(1999, 01, 01) : (DateTime)row["TimeUpdate"];
            this.lastMessage = row["lastMessage"].ToString();
            this.lastSender = (int)row["lastSender"];
            this.ChatWithFirstName = row["ChatWithFirstName"].ToString();
            this.ChatWithLastName = row["ChatWithLastName"].ToString();
            this.ChatWithAvatarUri = row["ChatWithAvatarUri"].ToString();
            this.ChatWithAvatar = row["ChatWithAvatarUri"].ToString();
            this.IsReaded = Convert.IsDBNull(row["IsRead"]) ? false : true;

        }
    }
}
