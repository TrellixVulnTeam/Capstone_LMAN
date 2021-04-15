using SOFA_API.Service;
using SOFA_API.ViewModel.Account;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.VirtualService
{
    public class VirtualUserService
    {
        public VirtualUserService()
        {
        }

        public virtual AdminAccountViewModelOut GetAllUser()
        {
            return UserService.Instance.GetAllUser();
        }
        public virtual AdminUserDetailViewModelOut GetUserDetailById(int accountId)
        {
            return UserService.Instance.GetUserDetailById(accountId);
        }
        public virtual AccountViewModelOut BanUser(int accountId)
        {
            return UserService.Instance.BanUser(accountId);
        }

    }
}
