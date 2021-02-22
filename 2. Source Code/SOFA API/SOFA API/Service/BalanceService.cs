using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.ViewModel;
using SOFA_API.ViewModel.Balance;
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
        public List<TransactionHistoryViewModelOut>  GetTransactionHistory(int accountID)
        {
            List<TransactionHistoryViewModelOut> transactionHistoryViewModelOuts = BalanceDAO.Instance.GetAllHistoryTransaction(accountID);
            return transactionHistoryViewModelOuts;

        }
    }
}
