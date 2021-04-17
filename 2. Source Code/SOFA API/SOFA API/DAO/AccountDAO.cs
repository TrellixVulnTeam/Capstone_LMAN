using SOFA_API.Common;
using SOFA_API.DTO;
using SOFA_API.Service;
using SOFA_API.ViewModel;
using SOFA_API.ViewModel.Account;
using SOFA_API.ViewModel.Profile;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class AccountDAO
    {
        private static AccountDAO instance;

        public static AccountDAO Instance
        {
            get
            {
                if (instance == null) instance = new AccountDAO();
                return instance;
            }
            private set { instance = value; }
        }
        public AccountDAO()
        {

        }

        //public Account GetUserByUserName(string username)
        //{
        //    string query = "EXEC GetUserByUserName @Username";
        //    DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { username });
        //    if (data.Rows.Count > 0)
        //    {
        //        Account account = new Account(data.Rows[0]);
        //        return account;
        //    }
        //    return null;
        //}

        public int AddAccount(AccountViewModelIn accountViewModel)
        {
            string query = "EXEC AddNewAccount @Username , @Password , @Firstname , @Lastname , @Email , @Phone , @RoleId , @DateCreated";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { accountViewModel.Username, accountViewModel.Password, 
                 accountViewModel.Firstname, accountViewModel.Lastname, accountViewModel.Email, accountViewModel.Phone, accountViewModel.RoleId,
            accountViewModel.DateCreated});
            return result;
        }

        public int AddNewStaff(AccountViewModelIn accountViewModel)
        {
            string query = "EXEC AddNewStaff @Username , @Password , @FirstName , @LastName , @RoleId , @DateCreated";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { accountViewModel.Username, 
                accountViewModel.Password, accountViewModel.Firstname, accountViewModel.Lastname, accountViewModel.RoleId, accountViewModel.DateCreated});
            return result;
        }

        //public AccountViewModel GetAccountByID(int id)
        //{
        //    string query = "EXEC GetProfileByID @id";
        //    DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { id });
        //    if (data.Rows.Count > 0)
        //    {
        //        AccountViewModel accountViewModel = new AccountViewModel(data.Rows[0]);
        //        return accountViewModel;
        //    }
        //    return null;
        //}
        public AccountViewModelOut GetUserWithRoleByUserName(string username)
        {
            string query = "EXEC GetUserWithRoleByUserName @Username";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { username });
            if (data.Rows.Count > 0)
            {
                AccountViewModelOut account = new AccountViewModelOut(data.Rows[0]);
                ProfileViewModelOut profile = ProfileService.Instance.GetProfileModelByAccountID(account.Id);
                if(profile != null)
                {
                    account.Firstname = profile.FirstName;
                    account.Lastname = profile.LastName;
                }
                return account;
            }
            return null;
        }

        public AccountViewModelOut GetUserWithRoleByEmail(string email)
        {
            string query = "EXEC GetUserWithRoleByEmail @Email";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { email });
            if (data.Rows.Count > 0)
            {
                AccountViewModelOut account = new AccountViewModelOut(data.Rows[0]);
                return account;
            }
            return null;
        }
        public AccountViewModelOut GetUserWithRoleByPhone(string phone)
        {
            string query = "EXEC GetUserWithRoleByPhone @Phone";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { phone });
            if (data.Rows.Count > 0)
            {
                AccountViewModelOut account = new AccountViewModelOut(data.Rows[0]);
                return account;
            }
            return null;
        }


        public void UpdateUserPassword(string username, string newPassword)
        {
            string query = "EXEC UpdateUserPassword @Username , @Password";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { username, newPassword });
        }

        public List<AdminAccountModelOut> GetAllUser()
        {
            List<AdminAccountModelOut> list = new List<AdminAccountModelOut>();

            String sql = "EXEC dbo.GetAllUserWithoutPaging";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] {});
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        list.Add(new AdminAccountModelOut(row));
                    }
                }
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
            }
            return list;
        }

        public AccountViewModelOut GetUserById(int id)
        {
            string query = "EXEC GetUserById @Id";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { id });
            if (data.Rows.Count > 0)
            {
                AccountViewModelOut account = new AccountViewModelOut(data.Rows[0]);
                return account;
            }
            return null;
        }

        public AdminUserDetailViewModelOut GetUserDetailById(int accountId)
        {
            string query = "EXEC GetUserDetailByID @AccountId";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { accountId });
            if (data.Rows.Count > 0)
            {
                AdminUserDetailViewModelOut user = new AdminUserDetailViewModelOut(data.Rows[0]);
                return user;
            }
            return null;
        }

        public int BanUser(int accountId)
        {
            int result = 0;
            try
            {
                string sql = "EXEC BanUser @AccountId";
                result = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { accountId });
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                throw ex;
            }
            return result;
        }

        public int UnbanUser(int accountId)
        {
            int result = 0;
            try
            {
                string sql = "EXEC UnbanUser @AccountId";
                result = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { accountId });
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                throw ex;
            }
            return result;
        }
    }
}
