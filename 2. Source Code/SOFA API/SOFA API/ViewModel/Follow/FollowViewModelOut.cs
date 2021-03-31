using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Follow
{
    public class FollowViewModelOut
    {
        public int RelationId { get; set; }
        public int FollowerId { get; set; }
        public int UserGetFollowId { get; set; }

        public FollowViewModelOut()
        {

        }

        public FollowViewModelOut(int relationId, int followerId, int userGetFollowId)
        {
            this.RelationId = relationId;
            this.FollowerId = followerId;
            this.UserGetFollowId = userGetFollowId;
        }

        public FollowViewModelOut(DataRow row)
        {
            this.RelationId = (int)row["Id"];
            this.FollowerId = (int)row["AccountId1"];
            this.UserGetFollowId = (int)row["AccountId2"];
        }
    }
}
