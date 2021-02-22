using SOFA_API.DTO;
using SOFA_API.ViewModel;
using SOFA_API.ViewModel.Profile;
using System;
using System.Collections.Generic;
using System.Data;
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

        /**
         * Function getProfileByAccountID
         * @param : accouuntId
         * return : Profile by its Account ID
         */
        public ProfileViewModelOut getProfileByAccountID(int accountId)
        {
            ProfileViewModelOut profile = null;

            string sql = "EXEC getProfileByAccountID @accountId";

            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountId });
            if(data.Rows.Count > 0)
            {
                profile = new ProfileViewModelOut(data.Rows[0]);
            }
            return profile;
        }

        /**
         * Function UpdateProfileByAccountID
         * @param : accouuntId
         * return : number of changed record 
         */
        public int updateProfileByAccountID(int accountId, ProfileViewModelOut newProfile)
        {
            int data = 0;

            string sql = "EXEC updateProfileByAccountID @accountId , @firstName , @lastName , @gender , @dob , @email , @phone , @address , @avatar";

            data = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { accountId, newProfile.FirstName, newProfile.LastName,
                                                                            newProfile.Gender, newProfile.DOB, newProfile.Email, newProfile.Phone,
                                                                            newProfile.Address, newProfile.AvatarUri});
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
