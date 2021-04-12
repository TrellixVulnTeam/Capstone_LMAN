using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class UserService
    {
        private static UserService instance;

        public static UserService Instance
        {
            get
            {
                if (instance == null) instance = new UserService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }
        public UserService()
        {
        }

        public AdminAccountViewModelOut GetAllUser()
        {
            AdminAccountViewModelOut listUsers = new AdminAccountViewModelOut();

            try
            {
                listUsers.ListUser = AccountDAO.Instance.GetAllUser();

                listUsers.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                listUsers.Code = Const.REQUEST_CODE_FAILED;
                listUsers.ErrorMessage = e.Message;
            }
            return listUsers;
        }

        public AdminUserDetailViewModelOut GetUserDetailById(int accountId)
        {
            AdminUserDetailViewModelOut userDetail = new AdminUserDetailViewModelOut();

            try
            {
                userDetail = AccountDAO.Instance.GetUserDetailById(accountId);

                userDetail.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                userDetail.Code = Const.REQUEST_CODE_FAILED;
                userDetail.ErrorMessage = e.Message;
            }
            return userDetail;
        }

        public AccountViewModelOut BanUser(int accountId)
        {
            AccountViewModelOut user = new AccountViewModelOut();

            try
            {
                user = AccountDAO.Instance.GetUserById(accountId);
                if (user != null)
                {
                    AccountDAO.Instance.BanUser(accountId);

                    user.IsActive = false;
                    user.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    throw new Exception("AccountId không tồn tại");
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                user.Code = Const.REQUEST_CODE_FAILED;
                user.ErrorMessage = e.Message;
            }
            return user;
        }

        public AccountViewModelOut UnbanUser(int accountId)
        {
            AccountViewModelOut user = new AccountViewModelOut();

            try
            {
                user = AccountDAO.Instance.GetUserById(accountId);
                if (user != null)
                {
                    AccountDAO.Instance.UnbanUser(accountId);

                    user.IsActive = true;
                    user.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                } else
                {
                    throw new Exception("AccountId không tồn tại");
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                user.Code = Const.REQUEST_CODE_FAILED;
                user.ErrorMessage = e.Message;
            }
            return user;
        }
        public AdminDashboardModelOut GetDashBoardInformation()
        {
            AdminDashboardModelOut modelOut = new AdminDashboardModelOut();
            try
            {
                List<AdminAccountModelOut> listUser = AccountDAO.Instance.GetAllUser();
                List<Post> listPost = PostDAO.Instance.GetAllPostWithoutPaging();

                modelOut.TotalUser = listUser.Count;
                modelOut.NumberOfUserActive = listUser.Count(user => user.IsActive == true);
                modelOut.TotalPost = listPost.Count;
                modelOut.NumberOfPostVerified = listPost.Count(post => post.IsVerified == true);
                modelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                modelOut.Code = Const.REQUEST_CODE_FAILED;
                modelOut.ErrorMessage = e.Message;
            }
            return modelOut;
        }
    }
}
