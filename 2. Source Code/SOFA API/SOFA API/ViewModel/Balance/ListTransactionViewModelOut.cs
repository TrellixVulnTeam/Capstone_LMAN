using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Balance
{
    public class ListTransactionViewModelOut : BaseModelOut
    {
        public decimal Balance { get; set; }
        public List<TransactionViewModelOut> listTransaction { get; set; }

        public ListTransactionViewModelOut()
        {
        }

        public ListTransactionViewModelOut(decimal balance, List<TransactionViewModelOut> listTransaction)
        {
            Balance = balance;
            this.listTransaction = listTransaction;
        }

        public ListTransactionViewModelOut(DataRow row)
        {

        }
    }
}
