using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Common
{
    public class Const
    {
        public const string SPEEDSMS_API_KEY = "c5dJoeANzhgraYjMqZ6gbGXoZ5Ms6k80";
        public const string SPEEDSMS_SENDER_ANHTRANG = "ANH TRANG";

        public const string SMTP_GMAIL = "smtp.gmail.com";
        public const string GMAIL_ACCOUNT = "SOFATeam2021@gmail.com";
        public const string GMAIL_APPLICATION_PASSWORD = "pnymsplkpljsfcqk";

        public const string MAIL_TYPE_OTP_GENERAL = "SEND_MAIL_OTP";
        public const string SMS_TYPE_OTP_GENERAL = "SEND_SMS_OTP";

        public const int VERIFICATION_TIME_WAIT = 60;
        public const int VERIFICATION_STATUS_MATCH = 1;
        public const int VERIFICATION_STATUS_NOT_MATCH = 0;

        public const int VERIFICATION_METHOD_USERNAME = 1;
        public const int VERIFICATION_METHOD_EMAIL = 2;
        public const int VERIFICATION_METHOD_PHONE = 3;
        public const int VERIFICATION_METHOD_ACCOUNT_ID = 4;

        public const int VERIFICATION_TRANSACTION_TYPE_REGISTER = 0;
        public const int VERIFICATION_TRANSACTION_TYPE_OTHER = 1;

        public const string REQUEST_CODE_SUCCESSFULLY = "SUCCESSFULLY";
        public const string REQUEST_CODE_FAILED = "FAILED";

        public static int ADMIN_ROLE_ID = 1;
        public static int USER_ROLE_ID = 2;
    }
}
