using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using TestJWT.DTO;
using TestJWT.ViewModel;

namespace TestJWT.DAO
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

        public AccountViewModel GetProfileByUsernameAndPassword(string username, string password)
        {
            string query = "EXEC GetProfileByUserNameAndPassWord @username , @password";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { username, password });
            if (data.Rows.Count > 0)
            {
                AccountViewModel accountViewModel = new AccountViewModel(data.Rows[0]);
                return accountViewModel;
            }
            return null;
        }

        public int AddAccount(AccountViewModel accountViewModel)
        {
            Account account = new Account(accountViewModel);
            Profile profile = new Profile(accountViewModel);
            string query = "EXEC AddAccountAndProfile @username , @password , @role , @firstname , @lastname , @gender , @dob";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { account.UserName, account.PassWord, account.Role, profile.FirstName,
                                                                                        profile.LastName, profile.Gender, profile.DOB});
            return result;
        }

        public AccountViewModel GetAccountByID(int id)
        {
            string query = "EXEC GetProfileByID @id";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { id });
            if (data.Rows.Count > 0)
            {
                AccountViewModel accountViewModel = new AccountViewModel(data.Rows[0]);
                return accountViewModel;
            }
            return null;
        }
    }
}
