using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Conversation
{
    public class ListSearchConversationViewModelOut : BaseModelOut
    {
        public List<SearchCoversationViewModelOut> listSearch { get; set; }

        public ListSearchConversationViewModelOut()
        {
        }

        public ListSearchConversationViewModelOut( List<SearchCoversationViewModelOut> listSearch)
        {
            this.listSearch = listSearch;
        }
    }
}
