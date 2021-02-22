using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Common
{
    public class Const
    {
        public const string SMTP_GMAIL = "smtp.gmail.com";
        public const string GMAIL_ACCOUNT = "SOFATeam2021@gmail.com";
        public const string GMAIL_APPLICATION_PASSWORD = "pnymsplkpljsfcqk";

        public const string MAIL_TYPE_OTP_GENERAL = "SEND_OTP";

        public const int VERIFICATION_TIME_WAIT = 60;
        public const int VERIFICATION_STATUS_MATCH = 1;
        public const int VERIFICATION_STATUS_NOT_MATCH = 0;
        public const int VERIFICATION_EMAIL_NOT_FOUND = 2;
        public const int VERIFICATION_PHONE_NOT_FOUND = 3;
        public const int VERIFICATION_ACCOUNT_NOT_FOUND = 4;

        public const int VERIFICATION_METHOD_USERNAME = 1;
        public const int VERIFICATION_METHOD_EMAIL = 2;
        public const int VERIFICATION_METHOD_PHONE = 3;

        public const string REQUEST_CODE_SUCCESSFULLY = "SUCCESSFULLY";
        public const string REQUEST_CODE_FAILED = "FAILED";

        


    }
}
