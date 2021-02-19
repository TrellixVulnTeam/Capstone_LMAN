using ChatAPI.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAPI.DAO
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

        public List<Account> GetAllFriend(int id)
        {
            List<Account> accounts = new List<Account>();
            string sql = "EXEC dbo.GetAllFriend @id";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { id });
            if (data.Rows.Count > 0)
            {
                foreach(DataRow row in data.Rows)
                {
                    accounts.Add(new Account(row));
                }
            }
            return accounts;

        }
        public Account GetAccountByUsernameAndPassword(string username, string password)
        {
            Account account = null;

            string sql = "EXEC GetAccountByUsernameAndPassword @username , @password";

            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { username, password });

            if (data.Rows.Count > 0)
            {
                account = new Account(data.Rows[0]);
            }

            return account;
        }
        public Account GetAccountByID(int id)
        {
            Account account = null;

            string sql = "EXEC dbo.GetAccountByID @id";

            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { id });
            if (data.Rows.Count > 0)
            {
                account = new Account(data.Rows[0]);
            }
            return account;
        }
    }
}
