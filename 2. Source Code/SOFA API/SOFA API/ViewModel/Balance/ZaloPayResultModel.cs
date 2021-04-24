using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Balance
{
    public class ZaloPayResultModel
    {
        public int ReturnCode { get; set; }
        public string ReturnMessage { get; set; }

        public ZaloPayResultModel()
        {
        }

        public ZaloPayResultModel(int returnCode, string returnMessage)
        {
            ReturnCode = returnCode;
            ReturnMessage = returnMessage;
        }
    }
}
