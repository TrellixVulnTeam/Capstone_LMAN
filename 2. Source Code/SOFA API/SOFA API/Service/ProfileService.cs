using SOFA_API.Common;
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
            ProfileViewModelOut profile = ProfileDAO.Instance.GetProfileModelByAccountID(accountId);
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

        /// <summary>
        /// Function UpdateProfileByAccountID
        /// </summary>
        /// <param name="accountId"></param>
        /// <param name="newProfile"></param>
        /// <returns>number of changed record </returns>
        public ProfileViewModelOut UpdateProfileByAccountID(int accountId, ProfileViewModelOut newProfile)
        {
            ProfileViewModelOut a = newProfile;
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
                //get current data
                ProfileViewModelOut currentProfile = ProfileService.Instance.GetProfileModelByAccountID(accountId);

                //update avatar
                String path = @"C:\inetpub\wwwroot\assets\Image\" + currentProfile.UserName + @"\";

                //Check if directory exist
                if (!System.IO.Directory.Exists(path))
                {
                    //Create directory if it doesn't exist
                    Directory.CreateDirectory(path);
                }

                //get current file name
                string imageName = Path.GetFileNameWithoutExtension(currentProfile.AvatarUri);

                //make new file name

                int newImageName = 1;
                bool checkConvert = Int32.TryParse(imageName, out newImageName);
                if (checkConvert)
                {
                    newImageName++;
                }

                //set the image path
                string imgPath = Path.Combine(path, (newImageName.ToString() + ".jpg"));

                byte[] imageBytes = Convert.FromBase64String(newProfile.Avatar.Trim().Replace(" ", "+"));
                System.IO.File.WriteAllBytes(imgPath, imageBytes);
                newProfile.AvatarUri = imgPath;

                int result = ProfileDAO.Instance.UpdateProfileByAccountID(accountId, newProfile);
                if (result == 1)
                {
                    newProfile.Code = Const.REQUEST_CODE_SUCCESSFULLY;                   
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
