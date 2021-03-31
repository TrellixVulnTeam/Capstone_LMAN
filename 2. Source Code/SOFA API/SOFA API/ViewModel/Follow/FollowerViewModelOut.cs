using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Follow
{
    public class FollowerViewModelOut : BaseModelOut
    {
        public int AccountId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarUri { get; set; }

        public FollowerViewModelOut() : base()
        {

        }

        public FollowerViewModelOut(int accountId, string firstname, string lastname, string avatarUri) : base()
        {
            this.AccountId = accountId;
            this.FirstName = firstname;
            this.LastName = lastname;
            this.AvatarUri = avatarUri;
        }

        public FollowerViewModelOut(DataRow row) : base()
        {
            this.AccountId = (int)row["AccountId"];
            this.FirstName = row["FirstName"].ToString();
            this.LastName = row["LastName"].ToString();
            this.AvatarUri = row["Avatar"].ToString();
        }
    }
}
