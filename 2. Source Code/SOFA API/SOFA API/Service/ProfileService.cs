using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel;
using SOFA_API.ViewModel.Profile;
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
        public ProfileViewModelOut getProfileByAccountID(int accountId)
        {
            ProfileViewModelOut profile = ProfileDAO.Instance.getProfileByAccountID(accountId);
            if(profile != null)
            {
                profile.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                profile.Code = Const.REQUEST_CODE_FAILED;
            }            
            return profile;
        }

        /**
         * function updateProfileByAccountID
         * @Param: accountId
         * return Dictionary
         */
        public ProfileViewModelOut updateProfileByAccountID(int accountId, ProfileViewModelOut newProfile)
        {
            if (String.IsNullOrEmpty(newProfile.FirstName))
            {
                newProfile.Code = Const.REQUEST_CODE_FAILED;
                newProfile.ErrorMessage = MessageUtils.ERROR_MISSING_FIRST_NAME;
            }
            else if (String.IsNullOrEmpty(newProfile.LastName))
            {
                newProfile.Code = Const.REQUEST_CODE_FAILED;
                newProfile.ErrorMessage = MessageUtils.ERROR_MISSING_LAST_NAME;
            }
            else if (String.IsNullOrEmpty(newProfile.Phone))
            {
                newProfile.Code = Const.REQUEST_CODE_FAILED;
                newProfile.ErrorMessage = MessageUtils.ERROR_MISSING_PHONE_NUMBER;
            }
            else
            {
                int result = ProfileDAO.Instance.updateProfileByAccountID(accountId, newProfile);
                if (result == 1)
                {
                    newProfile.Code = Const.REQUEST_CODE_SUCCESSFULLY);                   
                }
                else
                {
                    newProfile.Code = Const.REQUEST_CODE_FAILED;
                    newProfile.ErrorMessage = MessageUtils.ERROR_UPDATE_FAILED;
                }
            }                     
            return newProfile;
        }
    }
}
