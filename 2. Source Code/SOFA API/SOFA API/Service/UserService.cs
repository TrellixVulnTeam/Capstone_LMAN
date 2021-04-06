using SOFA_API.Common;
using SOFA_API.DAO;
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
    }
}
