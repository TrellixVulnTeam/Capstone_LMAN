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
        public List<TransactionViewModelOut> listTransaction { get; set; }

        public ListTransactionViewModelOut()
        {
        }

        public ListTransactionViewModelOut(List<TransactionViewModelOut> listTransaction)
        {
            this.listTransaction = listTransaction;
        }
        public ListTransactionViewModelOut(DataRow row)
        {

        }
    }
}
