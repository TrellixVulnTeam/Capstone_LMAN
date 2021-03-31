using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Follow
{
    public class FollowOfAPersonModelOut : BaseModelOut
    {
        public int FollowerNumber { get; set; }
        public List<FollowerViewModelOut> ListFollower { get; set; }
        public FollowOfAPersonModelOut() : base()
        {
            ListFollower = new List<FollowerViewModelOut>();
        }
        public FollowOfAPersonModelOut(int followerNumber, List<FollowerViewModelOut> listFollower) : base()
        {
            this.FollowerNumber = followerNumber;
            this.ListFollower = listFollower;
        }
    }
}
