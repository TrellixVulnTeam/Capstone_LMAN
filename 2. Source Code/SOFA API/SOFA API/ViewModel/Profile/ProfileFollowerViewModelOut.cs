using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Profile
{
    public class ProfileFollowerViewModelOut: BaseModelOut
    {
        public int AccountId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarUri { get; set; }

        public ProfileFollowerViewModelOut() : base()
        {

        }

        public ProfileFollowerViewModelOut(int accountId, string firstname, string lastname, string avatarUri) : base()
        {
            this.AccountId = accountId;
            this.FirstName = firstname;
            this.LastName = lastname;
            this.AvatarUri = avatarUri;
        }

        public ProfileFollowerViewModelOut(DataRow row) : base()
        {
            this.AccountId = (int)row["AccountId1"];
            this.FirstName = row["FirstName"].ToString();
            this.LastName = row["LastName"].ToString();
            this.AvatarUri = row["Avatar"].ToString();
        }
    }
}
