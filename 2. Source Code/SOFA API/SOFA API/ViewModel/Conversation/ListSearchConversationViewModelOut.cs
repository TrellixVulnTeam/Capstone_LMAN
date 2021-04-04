using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Conversation
{
    public class ListSearchConversationViewModelOut : BaseModelOut
    {
        public int accountID { get; set; }
        public List<SearchCoversationViewModelOut> listSearch { get; set; }

        public ListSearchConversationViewModelOut()
        {
        }

        public ListSearchConversationViewModelOut(int accountID, List<SearchCoversationViewModelOut> listSearch)
        {
            this.accountID = accountID;
            this.listSearch = listSearch;
        }
    }
}
