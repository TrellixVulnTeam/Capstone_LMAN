using ChatAPI.DAO;
using ChatAPI.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAPI.Service
{
    public class AccountService
    {
        private static AccountService instance;

        public static AccountService Instance
        {
            get
            {
                if (instance == null) instance = new AccountService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }

        public AccountService()
        {
        }
        public Dictionary<string, object> GetAllFriend(int id)
        {
            List<Account> accounts = AccountDAO.Instance.GetAllFriend(id);
            List<Dictionary<string, object>> friends = new List<Dictionary<string, object>>();
            foreach(Account account in accounts)
            {
                Dictionary<string, object> friend = new Dictionary<string, object>();
                friend.Add("id", account.ID);
                friend.Add("firstName", account.FirstName);
                friend.Add("lastName", account.LastName);
                friend.Add("avatar", account.Avatar);
                friends.Add(friend);
            }
            Dictionary<string, object> res = new Dictionary<string, object>();
            res.Add("code", "SUCCESSFULLY");
            res.Add("friends", friends);
            return res;
        }
        public Dictionary<string, object> GetAccount(int id)
        {
            Account account = AccountDAO.Instance.GetAccountByID(id);
            Dictionary<string, object> res = new Dictionary<string, object>();
            res.Add("code", "SUCCESSFULLY");
            res.Add("account", account);
            return res;
        }
        public Dictionary<string, object> GetOtherAccount(int id)
        {
            Account account = AccountDAO.Instance.GetAccountByID(id);
            Dictionary<string, object> res = new Dictionary<string, object>();
            res.Add("code", "SUCCESSFULLY");
            res.Add("firstName", account.FirstName);
            res.Add("lastName", account.LastName);
            res.Add("avatar", account.Avatar);
            return res;
        }
    }
}
