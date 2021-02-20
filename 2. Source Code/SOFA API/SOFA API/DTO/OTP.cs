using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class OTP
    {
        public int ID { get; set; }
        public int Code { get; set; }

        public OTP()
        {
        }

        public OTP(int iD, int code)
        {
            ID = iD;
            Code = code;
        }
        public OTP(DataRow row)
        {
            ID = (int)row["id"];
            Code = (int)row["code"];
        }
    }
}
