using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Verificatiton
{
    public class VerificationModelOut : BaseModelOut
    {

        public int TransactionID { get; set; }
        public int VerificationStatus { get; set; }
        public VerificationModelOut():base()
        {

        }

        public VerificationModelOut(int transactionID, int verificationStatus):base()
        {
            TransactionID = transactionID;
            VerificationStatus = verificationStatus;
        }
    }
}
