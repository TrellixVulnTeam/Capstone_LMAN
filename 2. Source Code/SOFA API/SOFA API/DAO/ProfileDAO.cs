using SOFA_API.Common;
using SOFA_API.DTO;
using SOFA_API.ViewModel;
using SOFA_API.ViewModel.Profile;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class ProfileDAO
    {
        private static ProfileDAO instance;

        public static ProfileDAO Instance
        {
            get
            {
                if (instance == null) instance = new ProfileDAO();
                return instance;
            }
            private set { instance = value; }
        }
        public ProfileDAO()
        {

        }

        /// <summary>
        /// Function to get Profile by account ID
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns>Profile by it accountID</returns>
        public ProfileViewModelOut getProfileByAccountID(int accountId)
        {
            ProfileViewModelOut profile = null;

            string sql = "EXEC getProfileByAccountID @accountId";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountId });
                if (data.Rows.Count > 0)
                {
                    profile = new ProfileViewModelOut(data.Rows[0]);
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }           
            return profile;
        }

        /// <summary>
        /// Function UpdateProfileByAccountID
        /// </summary>
        /// <param name="accountId"></param>
        /// <param name="newProfile"></param>
        /// <returns>number of changed record </returns>
        public int updateProfileByAccountID(int accountId, ProfileViewModelOut newProfile)
        {
            int data = 0;

            string sql = "EXEC updateProfileByAccountID @accountId , @firstName , @lastName , @gender , @dob , @email , @phone , @address , @avatar";
            try
            {
                data = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { accountId, newProfile.FirstName, newProfile.LastName,
                                                                            newProfile.Gender, newProfile.DOB, newProfile.Email, newProfile.Phone,
                                                                            newProfile.Address, newProfile.AvatarUri});
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            
            return data;
        }

        public int updateAvatar (string imageBase64)
        {
            int data = 0;
            //convert base64 to image and save
            //Path
            String path = @"C:\inetpub\wwwroot\assets\Image\Message\";
            try
            {
                //Check if directory exist
                if (!System.IO.Directory.Exists(path))
                {
                    System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
                }
                string imageName = "a" + ".jpg";

                //set the image path
                string imgPath = Path.Combine(path, imageName);

                byte[] imageBytes = Convert.FromBase64String(imageBase64.Trim().Replace(" ","+"));
                File.WriteAllBytes(imgPath, imageBytes);
                data = 1;
            }catch(Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }            
            return data;
        }

        public Profile GetProfileByEmail(string email)
        {
            Profile profile = null;
            string sql = "EXEC dbo.GetProfileByEmail @email";

            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { email });

            if (data.Rows.Count > 0)
            {
                profile = new Profile(data.Rows[0]);
            }
            return profile;
        }
    }
}
