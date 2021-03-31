using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Follow
    {
        public int RelationId { get; set; }
        public int FollowerId { get; set; }
        public int UserGetFollowId { get; set; }

        public Follow()
        {

        }

        public Follow(int relationId, int followerId, int userGetFollowId)
        {
            this.RelationId = relationId;
            this.FollowerId = followerId;
            this.UserGetFollowId = userGetFollowId;
        }

    }
}
