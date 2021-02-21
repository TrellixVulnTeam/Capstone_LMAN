using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class BalanceService
    {
        public static BalanceService instance;
        public static BalanceService Instance
        {
            get
            {
                if (instance == null) instance = new BalanceService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }
        public BalanceService()
        {

        }
        public Dictionary<string, object> GetBalanceByAccountID(int id)
        {
            decimal Balance = BalanceDAO.Instance.GetBalanceByAccountID(id);
            Dictionary<string, object> res = new Dictionary<string, object>();
            res.Add("code", Const.REQUEST_CODE_SUCCESSFULLY);
            res.Add("Balance", Balance);
            return res;
        }
        public Dictionary<string, object> GetTransactionHistory(int accountID)
        {
            List<TransactionHistoryViewModel> transactionHistories = BalanceDAO.Instance.GetAllHistoryTransaction(accountID);
            List<Dictionary<string, object>> transactions = new List<Dictionary<string, object>>();
            foreach (TransactionHistoryViewModel tran in transactionHistories)
            {
                Dictionary<string, object> transaction = new Dictionary<string, object>();
                transaction.Add("transactionId", tran.TransactionId);
                transaction.Add("beforeBalance", tran.BeforeBalance);
                transaction.Add("afterBalance", tran.AfterBalance);
                transaction.Add("amount", tran.Amount);
                transaction.Add("typeID", tran.TypeID);
                transaction.Add("transactionTime", tran.TransactionTime);
                transaction.Add("fromAccountID", tran.FromAccountId);
                transaction.Add("toAccountID", tran.ToAccountID);
                transactions.Add(transaction);
            }
            Dictionary<string, object> res = new Dictionary<string, object>();
            res.Add("code", Const.REQUEST_CODE_SUCCESSFULLY);
            res.Add("transactionHistories", transactions);
            return res;

        }
    }
}
