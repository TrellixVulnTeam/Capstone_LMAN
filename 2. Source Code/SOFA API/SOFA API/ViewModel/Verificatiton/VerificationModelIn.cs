using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Verificatiton
{
    public class VerificationModelIn : BaseModelIn
    {
        public int ID { get; set; }
        public int Code { get; set; }
        public int TransactionType { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public VerificationModelIn():base()
        {
        }

        public VerificationModelIn(int iD, int code, int transactionType, string email, string phoneNumber):base()
        {
            ID = iD;
            Code = code;
            TransactionType = transactionType;
            Email = email;
            PhoneNumber = phoneNumber;
        }
    }
}
