using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SOFA_API.ViewModel.BaseModel;

namespace SOFA_API.ViewModel.Conversation
{
    public class ConversationViewModelIn : BaseModelIn
    {
        public int AccountId { get; set; }

        public ConversationViewModelIn()
        {
        }

        public ConversationViewModelIn(int accountId)
        {
            AccountId = accountId;
        }
    }
}
