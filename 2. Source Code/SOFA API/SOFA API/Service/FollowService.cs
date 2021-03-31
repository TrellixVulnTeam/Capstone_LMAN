using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.ViewModel.Follow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class FollowService
    {
        private static FollowService instance;

        public static FollowService Instance
        {
            get
            {
                if (instance == null) instance = new FollowService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }

        public FollowService()
        {
        }

        /// <summary>
        /// Function to get number of people who follow someone
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>a FollowOfAPersonModelOut</returns>
        public FollowOfAPersonModelOut GetFollowerNumber(int userId)
        {
            FollowOfAPersonModelOut follow = new FollowOfAPersonModelOut();
            try
            {
                follow.FollowerNumber = FollowDAO.Instance.GetFollowerNumber(userId);
            }
            catch(Exception e)
            {
                follow.Code = Const.REQUEST_CODE_FAILED;
                follow.ErrorMessage = e.ToString();
            }
            return follow;
        }

        /// <summary>
        /// Function to get a list of people who follow someone
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>a FollowOfAPersonModelOut</returns>
        public FollowOfAPersonModelOut GetFollowerList(int userId)
        {
            FollowOfAPersonModelOut follow = new FollowOfAPersonModelOut();
            try
            {
                follow.ListFollower = FollowDAO.Instance.GetListFollower(userId);
                follow.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                follow.Code = Const.REQUEST_CODE_FAILED;
                follow.ErrorMessage = e.ToString();
            }
            return follow;
        }

        /// <summary>
        /// Function to follow someone
        /// </summary>
        /// <param name="followerId"></param>
        /// <param name="userGetFollowId"></param>
        /// <returns></returns>
        public FollowViewModelOut FollowSomeone(int followerId, int userGetFollowId)
        {
            FollowViewModelOut follow = null;
            try
            {
                follow = FollowDAO.Instance.FollowSomeone(followerId, userGetFollowId);
                if (follow != null)
                {
                    follow.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    follow = new FollowViewModelOut();
                    follow.Code = Const.REQUEST_CODE_FAILED;
                    follow.ErrorMessage = "Follow failed";
                }
            }
            catch(Exception e)
            {
                follow = new FollowViewModelOut();
                follow.Code = Const.REQUEST_CODE_FAILED;
                follow.ErrorMessage = e.ToString();
            }
            return follow;
        }

        /// <summary>
        /// Function to Unfollow someone
        /// </summary>
        /// <param name="followerId"></param>
        /// <param name="userGetFollowId"></param>
        /// <returns></returns>
        public FollowViewModelOut UnfollowSomeone(int followerId, int userGetFollowId)
        {
            FollowViewModelOut follow = new FollowViewModelOut();
            try
            {
                int result = FollowDAO.Instance.UnfollowSomeone(followerId, userGetFollowId);
                if(result != 0)
                {
                    follow.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    follow.Code = Const.REQUEST_CODE_FAILED;
                    follow.ErrorMessage = "Unfollow failed";
                }
            }
            catch (Exception e)
            {
                follow.Code = Const.REQUEST_CODE_FAILED;
                follow.ErrorMessage = e.ToString();
            }
            return follow;
        }

        /// <summary>
        /// Function to check if someone follewed other
        /// </summary>
        /// <param name="followerId"></param>
        /// <param name="userGetFollowId"></param>
        /// <returns></returns>
        public FollowViewModelOut CheckFollowed(int followerId, int userGetFollowId)
        {
            FollowViewModelOut follow = new FollowViewModelOut();
            try
            {
                follow.IsFollowed = FollowDAO.Instance.CheckFollowed(followerId, userGetFollowId);
                follow.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                follow.Code = Const.REQUEST_CODE_FAILED;
                follow.ErrorMessage = e.ToString();
            }
            return follow;
        }
    }
}
