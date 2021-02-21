using SOFA_API.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class BalanceDAO
    {
        private static BalanceDAO instance;

        public static BalanceDAO Instance
        {
            get
            {
                if (instance == null) instance = new BalanceDAO();
                return instance;
            }
            private set { instance = value; }
        }

        public BalanceDAO()
        {

        }

        public decimal GetBalanceByAccountID(int id)
        {
            decimal Balance = 0;
            string sql = "EXEC dbo.getBalanceByAccountID @AccountID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] {id });
            if(data.Rows.Count > 0)
            {
                Balance= (decimal)data.Rows[0]["AfterBalance"];
            }
            return Balance;
        }

        public List<TransactionHistoryViewModel> GetAllHistoryTransaction(int accountId)
        {
            List<TransactionHistoryViewModel> transactionHistories = new List<TransactionHistoryViewModel>();
            string sql = "EXEC  dbo.getTransactionHistoryByAccountID @AccountID";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountId });
            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    transactionHistories.Add(new TransactionHistoryViewModel(row));
                }
            }
            return transactionHistories;
        }
    }
}
