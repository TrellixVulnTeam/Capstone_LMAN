using SOFA_API.DTO;
using SOFA_API.ViewModel;
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
        public ProfileViewModel getProfileByAccountID(int accountId)
        {
            ProfileViewModel profile = null;

            string sql = "EXEC getProfileByAccountID @accountId";

            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountId });
            if(data.Rows.Count > 0)
            {
                profile = new ProfileViewModel(data.Rows[0]);
            }
            return profile;
        }

        /**
         * Function UpdateProfileByAccountID
         * @param : accouuntId
         * return : number of changed record 
         */
        public int updateProfileByAccountID(int accountId, ProfileViewModel newProfile)
        {
            int data = 0;

            string sql = "EXEC updateProfileByAccountID @accountId , @firstName , @lastName , @gender , @dob , @email , @phone , @address , @avatar";

            data = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { accountId, newProfile.FirstName, newProfile.LastName,
                                                                            newProfile.Gender, newProfile.DOB, newProfile.Email, newProfile.Phone,
                                                                            newProfile.Address, newProfile.AvatarUri});
            return data;
        }
    }
}
