using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Follow
{
    public class FollowViewModelOut : BaseModelOut
    {
        public int RelationId { get; set; }
        public int FollowerId { get; set; }
        public int UserGetFollowId { get; set; }

        public bool IsFollowed { get; set; }

        public FollowViewModelOut() : base()
        {
            IsFollowed = false;
        }

        public FollowViewModelOut(int relationId, int followerId, int userGetFollowId, bool isFollowwed) : base()
        {
            this.RelationId = relationId;
            this.FollowerId = followerId;
            this.UserGetFollowId = userGetFollowId;
            this.IsFollowed = isFollowwed;
        }

        public FollowViewModelOut(DataRow row) : base()
        {
            this.RelationId = (int)row["Id"];
            this.FollowerId = (int)row["AccountId1"];
            this.UserGetFollowId = (int)row["AccountId2"];
            this.IsFollowed = false;
        }
    }
}
