using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Conversation
{
    public class SearchCoversationViewModelOut : BaseModelOut
    {
        public int accountSearch { get; set; }
        public int accountId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string userName { get; set; }
        public string avatarUri { get; set; }

        public SearchCoversationViewModelOut()
        {
        }

        public SearchCoversationViewModelOut(int accountSearch, int accountId, string firstName, string lastName, string userName, string avatarUri)
        {
            this.accountSearch = accountSearch;
            this.accountId = accountId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.userName = userName;
            this.avatarUri = avatarUri;
        }

        public SearchCoversationViewModelOut(DataRow row, int accountDoSearch)
        {
            accountSearch = accountDoSearch;
            accountId = (int)row["Id"];
            firstName = row["FirstName"].ToString();
            lastName = row["LastName"].ToString();
            userName = row["UserName"].ToString();
            avatarUri = row["Avatar"].ToString();
        }
    }
}
