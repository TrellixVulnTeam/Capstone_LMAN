using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SOFA_API.ViewModel.BaseModel;

namespace SOFA_API.ViewModel.Conversation
{
    public class ListConversationViewModelIn : BaseModelIn
    {
        public int AccountId { get; set; }

        public ListConversationViewModelIn()
        {
        }

        public ListConversationViewModelIn(int accountId)
        {
            AccountId = accountId;
        }
    }
}
