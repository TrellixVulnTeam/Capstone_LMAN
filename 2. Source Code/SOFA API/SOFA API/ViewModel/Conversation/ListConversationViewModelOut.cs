using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SOFA_API.ViewModel.BaseModel;
using System.Data;

namespace SOFA_API.ViewModel.Conversation
{
    public class ListConversationViewModelOut : BaseModelOut
    {
        public int AccountId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarUri { get; set; }
        public string Avatar { get; set; }
        public string UserName { get; set; }
        public int NumberUnreadMessage { get; set; }
        public List<ConversationViewModelOut> listConversation { get; set; }

        public ListConversationViewModelOut() : base()
        {
        }

        public ListConversationViewModelOut(int accountId, string firstName, string lastName, string avatarUri, string avatar, string userName, List<ConversationViewModelOut> listConversation, int numberUnreadMessage)
        {
            AccountId = accountId;
            FirstName = firstName;
            LastName = lastName;
            AvatarUri = avatarUri;
            Avatar = avatar;
            UserName = userName;
            this.listConversation = listConversation;
            this.NumberUnreadMessage = numberUnreadMessage;
        }
    }
}
