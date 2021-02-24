using SOFA_API.DTO;
using SOFA_API.ViewModel;
using SOFA_API.ViewModel.Account;
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
            string query = "EXEC AddNewAccount @Username , @Password , @Email , @Phone , @RoleId";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { accountViewModel.Username, accountViewModel.Password, 
                accountViewModel.Email, accountViewModel.Phone, accountViewModel.RoleId});
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
    }
}
