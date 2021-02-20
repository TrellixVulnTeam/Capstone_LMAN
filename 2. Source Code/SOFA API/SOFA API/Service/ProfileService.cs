using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class ProfileService
    {
        private static ProfileService instance;

        public static ProfileService Instance
        {
            get
            {
                if (instance == null) instance = new ProfileService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }

        public ProfileService()
        {
        }

        /**
         * Function getProfileByAccountID
         * @Param : accountId
         * return Dictionary
         */
        public Dictionary<string, object> getProfileByAccountID(int accountId)
        {
            ProfileViewModel profile = ProfileDAO.Instance.getProfileByAccountID(accountId);
            Dictionary<string, object> res = new Dictionary<string, object>();
            res.Add("code", Const.REQUEST_CODE_SUCCESSFULLY);
            res.Add("profile", profile);
            return res;
        }

        /**
         * function updateProfileByAccountID
         * @Param: accountId
         * return Dictionary
         */
        public Dictionary<string, object> updateProfileByAccountID(int accountId, ProfileViewModel newProfile)
        {
            int result = ProfileDAO.Instance.updateProfileByAccountID(accountId, newProfile);
            Dictionary<string, object> res = new Dictionary<string, object>();
            if (result == 1)
            {
                res.Add("code", Const.REQUEST_CODE_SUCCESSFULLY);
                res.Add("newProfile", newProfile);
            }
            else
            {
                res.Add("code", Const.REQUEST_CODE_FAILED);
            }
            return res;
        }
    }
}
