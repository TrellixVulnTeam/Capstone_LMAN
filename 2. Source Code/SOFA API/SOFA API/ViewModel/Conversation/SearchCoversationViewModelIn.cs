using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Conversation
{
    public class SearchCoversationViewModelIn : BaseModelIn
    {
        public string searchValue { get; set; }

        public SearchCoversationViewModelIn()
        {
        }

        public SearchCoversationViewModelIn(string searchValue)
        {
            this.searchValue = searchValue;
        }
    }
}
