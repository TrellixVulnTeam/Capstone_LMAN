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
        public ProfileViewModelOut GetProfileModelByAccountID(int accountId)
        {
            ProfileViewModelOut profile = new ProfileViewModelOut();

            string sql = "EXEC getProfileByAccountID @accountId";
            string sqlGetPostNum = "Select COUNT(*) from Post where AccountPost = " + accountId;
            string sqlGetFollowNum = "Select COUNT(*) from AccountRelation where AccountId2 = " + accountId + " and RelationType = 1";
            try
            {
                //Get data of profile
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountId });
                if (data.Rows.Count > 0)
                {
                    profile = new ProfileViewModelOut(data.Rows[0]);
                }
                else
                {
                    return null;
                }
                //Get number of post
                int postNum = (int)DataProvider.Instance.ExecuteScalar(sqlGetPostNum);
                profile.PostNumber = postNum;

                //Get follow of post
                int followNum = (int)DataProvider.Instance.ExecuteScalar(sqlGetFollowNum);
                profile.FollowerNumber = followNum;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return profile;
        }

        /// <summary>
        /// Function UpdateProfileByAccountID
        /// </summary>
        /// <param name="accountId"></param>
        /// <param name="newProfile"></param>
        /// <returns>number of changed record </returns>
        public int UpdateProfileByAccountID(int accountId, ProfileViewModelIn newProfile)
        {
            int data = 0;

            string sql = "EXEC updateProfileByAccountID @accountId , @firstName , @lastName , @gender , @dob , @email , @phone , @address";
            try
            {
                data = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { accountId, newProfile.FirstName, newProfile.LastName,
                                                                            newProfile.Gender, newProfile.DOB, newProfile.Email, newProfile.Phone,
                                                                            newProfile.Address});
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }

            return data;
        }

        /// <summary>
        /// UpdateAvatarByAccountID
        /// </summary>
        /// <param name="accountId"></param>
        /// <param name="newProfile"></param>
        /// <returns></returns>
        public int UpdateAvatarByAccountID(int accountId, ProfileViewModelIn newProfile)
        {
            int data = 0;

            string sql = "update dbo.Profile set Avatar = '" + newProfile.AvatarUri + "' where AccountId = " + accountId;
            try
            {
                data = DataProvider.Instance.ExecuteNonQuery(sql);
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }

            return data;
        }

        /// <summary>
        /// Get Profile of user by account id
        /// </summary>
        /// <param name="email"></param>
        /// <returns>Profile include account, profile and role</returns>
        public Profile GetProfileByAccountID(int id)
        {
            Profile profile = null;
            string sql = "EXEC dbo.GetProfileByAccountID @id";

            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { id });

            if (data.Rows.Count > 0)
            {
                profile = new Profile(data.Rows[0]);
            }
            return profile;
        }
        /// <summary>
        /// Get Profile of user by email
        /// </summary>
        /// <param name="email"></param>
        /// <returns>Profile include account, profile and role</returns>
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
        /// <summary>
        /// Get Profile of user by phone number
        /// </summary>
        /// <param name="phone"></param>
        /// <returns>Profile include account, profile and role</returns>
        public Profile GetProfileByPhone(string phone)
        {
            Profile profile = null;
            string sql = "EXEC dbo.GetProfileByPhone @phone";

            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { phone });

            if (data.Rows.Count > 0)
            {
                profile = new Profile(data.Rows[0]);
            }
            return profile;
        }
        /// <summary>
        /// Get Profile of user by phone number
        /// </summary>
        /// <param name="phone"></param>
        /// <returns>Profile include account, profile and role</returns>
        public Profile GetProfileByUsername(string username)
        {
            Profile profile = null;
            string sql = "EXEC dbo.GetProfileByUsername @username";

            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { username });

            if (data.Rows.Count > 0)
            {
                profile = new Profile(data.Rows[0]);
            }
            return profile;
        }

        /// <summary>
        /// Function get people who follow someone
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns>a list of People</returns>
        public List<ProfileFollowerViewModelOut> getPeopleFollowByAccountId(int accountId)
        {
            List<ProfileFollowerViewModelOut> list = new List<ProfileFollowerViewModelOut>();
            string sql = "EXEC getPeopleFollowByAccountID @accountId";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountId });

            if (data.Rows.Count > 0)
            {
                for (int i = 0; i < data.Rows.Count; i++)
                {
                    ProfileFollowerViewModelOut profile = new ProfileFollowerViewModelOut(data.Rows[i]);
                    list.Add(profile);
                }
            }
            return list;
        }
        /// <summary>
        /// Function get people who follow someone
        /// </summary>
        /// <param name="keyword">Keyword use to search</param>
        /// <returns>a list of People</returns>
        public List<ProfileModelOut> SearchUserByName(string keyword, int page, int rowsOfPage)
        {
            List<ProfileModelOut> list = new List<ProfileModelOut>();
            string sql = "EXEC dbo.GetProfileByName @keyword , @page , @rowsOfPage";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { keyword, page, rowsOfPage });
            if (data.Rows.Count > 0)
            {
                for (int i = 0; i < data.Rows.Count; i++)
                {
                    ProfileModelOut profile = new ProfileModelOut(data.Rows[i]);
                    list.Add(profile);
                }
            }
            return list;
        }
    }
}
