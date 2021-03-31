﻿using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel;
using SOFA_API.ViewModel.Profile;
using System;
using System.Collections.Generic;
using System.IO;
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

        /// <summary>
        /// Function to get Profile by account ID
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns>Profile by it accountID</returns>
        public ProfileViewModelOut GetProfileModelByAccountID(int accountId)
        {
            ProfileViewModelOut profile = null;
            try
            {
                profile = ProfileDAO.Instance.GetProfileModelByAccountID(accountId);
                if (profile != null)
                {
                    profile.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    profile = new ProfileViewModelOut();
                    profile.Code = Const.REQUEST_CODE_FAILED;
                    throw new Exception("Can't get profile");
                }
            }
            catch (Exception e)
            {
                profile = new ProfileViewModelOut();
                profile.ErrorMessage = e.ToString();
                profile.Code = Const.REQUEST_CODE_FAILED;
            }
            return profile;
        }

        /// <summary>
        /// Function get Follow People by Account Id
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns>A profileViewModelOut</returns>
        public ProfileViewModelOut GetFollowerPeopelByAccountID(int accountId)
        {
            ProfileViewModelOut newProfile = new ProfileViewModelOut();
            try
            {
                newProfile.ListFollower = ProfileDAO.Instance.getPeopleFollowByAccountId(accountId);
                newProfile.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                newProfile.ErrorMessage = e.ToString();
                newProfile.Code = Const.REQUEST_CODE_FAILED;
            }
            return newProfile;
        }

        /// <summary>
        /// Function UpdateProfileByAccountID
        /// </summary>
        /// <param name="accountId"></param>
        /// <param name="profileIn"></param>
        /// <returns>number of changed record </returns>
        public ProfileViewModelOut UpdateProfileByAccountID(int accountId, ProfileViewModelIn profileIn)
        {
            ProfileViewModelOut newProfile = new ProfileViewModelOut();
            try
            {
                if (String.IsNullOrEmpty(profileIn.FirstName))
                {
                    newProfile.Code = Const.REQUEST_CODE_FAILED;
                    newProfile.ErrorMessage = MessageUtils.ERROR_MISSING_FIRST_NAME;
                    throw new Exception(MessageUtils.ERROR_MISSING_FIRST_NAME);
                }
                else if (String.IsNullOrEmpty(profileIn.LastName))
                {
                    newProfile.Code = Const.REQUEST_CODE_FAILED;
                    newProfile.ErrorMessage = MessageUtils.ERROR_MISSING_LAST_NAME;
                    throw new Exception(MessageUtils.ERROR_MISSING_LAST_NAME);
                }
                else if (String.IsNullOrEmpty(profileIn.Phone))
                {
                    newProfile.Code = Const.REQUEST_CODE_FAILED;
                    newProfile.ErrorMessage = MessageUtils.ERROR_MISSING_PHONE_NUMBER;
                    throw new Exception(MessageUtils.ERROR_MISSING_PHONE_NUMBER);
                }
                else
                {
                    int result = ProfileDAO.Instance.UpdateProfileByAccountID(accountId, profileIn);
                    if (result == 1)
                    {
                        newProfile.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    }
                    else
                    {
                        newProfile.Code = Const.REQUEST_CODE_FAILED;
                        newProfile.ErrorMessage = MessageUtils.ERROR_UPDATE_FAILED;
                        throw new Exception(MessageUtils.ERROR_UPDATE_FAILED);
                    }
                }
            }
            catch (Exception e)
            {
                newProfile.ErrorMessage = e.ToString();
                newProfile.Code = Const.REQUEST_CODE_FAILED;
            }
            return newProfile;
        }

        public ProfileViewModelOut UpdateAvatarByAccountID(int accountId, ProfileViewModelIn profileIn)
        {
            ProfileViewModelOut newProfile = new ProfileViewModelOut();
            try
            {
                if (profileIn.Avatar != null)
                {
                    //get current data
                    ProfileViewModelOut currentProfile = ProfileService.Instance.GetProfileModelByAccountID(accountId);

                    //update avatar
                    String path = Const.ASSETS_PATH + currentProfile.UserName + @"\avatar\";
                    if (!System.IO.Directory.Exists(path))
                    {
                        //Create directory if it doesn't exist
                        Directory.CreateDirectory(path);
                    }

                    //get current file name
                    string imageName = Path.GetFileNameWithoutExtension(currentProfile.AvatarUri);
                    if (String.IsNullOrEmpty(imageName)) imageName = "0";
                    //make new file name

                    int newImageName = 1;
                    bool checkConvert = Int32.TryParse(imageName, out newImageName);
                    if (checkConvert)
                    {
                        newImageName++;
                    }
                    else
                    {
                        newProfile.Code = Const.REQUEST_CODE_FAILED;
                        throw new Exception("Image name is wrong format");
                    }


                    //save image
                    Utils.Instance.SaveImageFromBase64String(profileIn.Avatar.Trim(), path, (newImageName.ToString() + ".png"));

                    profileIn.AvatarUri = currentProfile.UserName.Trim() + "/avatar/" + (newImageName.ToString() + ".png");

                    int result = ProfileDAO.Instance.UpdateAvatarByAccountID(accountId, profileIn);
                    if (result == 1)
                    {
                        newProfile.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    }
                    else
                    {
                        newProfile.Code = Const.REQUEST_CODE_FAILED;
                        newProfile.ErrorMessage = MessageUtils.ERROR_UPDATE_FAILED;
                        throw new Exception(MessageUtils.ERROR_UPDATE_FAILED);
                    }
                }
            }
            catch (Exception e)
            {
                newProfile.ErrorMessage = e.ToString();
                newProfile.Code = Const.REQUEST_CODE_FAILED;
            }
            return newProfile;
        }
    }
}
