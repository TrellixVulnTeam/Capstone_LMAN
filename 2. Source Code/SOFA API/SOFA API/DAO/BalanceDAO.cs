using SOFA_API.Common;
using SOFA_API.ViewModel;
using SOFA_API.ViewModel.Balance;
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
        /// <summary>
        /// Get Balance By Account ID
        /// </summary>
        /// <param name="modelIn">
        /// This param require fields: AccountID
        /// </param>
        /// <returns></returns>
        public GetBalanceViewModelOut GetBalanceByAccountID(GetBalanceViewModelIn modelIn)
        {
            GetBalanceViewModelOut modelOut = null;
            string sql = "EXEC dbo.getBalanceByAccountID @AccountID";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { modelIn.AccountId });
                if (data.Rows.Count > 0)
                {
                    modelOut = new GetBalanceViewModelOut((decimal)data.Rows[0]["Balance"]);
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            return modelOut;
        }
        /// <summary>
        /// Get TransactionHistory By Account ID
        /// </summary>
        /// <param name="modelIn">
        /// This param require fields: AccountID
        /// </param>
        /// <returns></returns>
        public ListTransactionViewModelOut GetAllHistoryTransaction(GetBalanceViewModelIn modelIn)
        {
            ListTransactionViewModelOut viewModelOut = null;
            List<TransactionViewModelOut> listTransaction = new List<TransactionViewModelOut>();
            string sql = "EXEC  dbo.getTransactionHistoryByAccountID @AccountID";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { modelIn.AccountId });
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        listTransaction.Add(new TransactionViewModelOut(row));
                    }
                    viewModelOut = new ListTransactionViewModelOut(listTransaction);
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            return viewModelOut;
        }
        /// <summary>
        /// TopUp Account by admin
        /// </summary>
        /// <param name="topUp">
        /// This param require fields: AccountId , AdminId , Amount , Description
        /// </param>
        /// <returns></returns>
        public int TopUpAccount(TopUpAccountModelIn topUp)
        {
            int data = 0;
            TopUpAccountModelOut topUpAccountModelOut = new TopUpAccountModelOut();
            string sql = "EXEC dbo.topUpForAccount @AccountID , @Amount , @AdminID , @Description";
            try
            {
                data = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { topUp.AccountId, topUp.Amount, topUp.AdminId, topUp.Description });
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            return data; ;

        }
    }
}
