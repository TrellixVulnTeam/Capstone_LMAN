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

        public const int ADMIN_ROLE_ID = 1;
        public const int USER_ROLE_ID = 2;


        public const string ASSETS_PATH = @"C:\inetpub\wwwroot\assets\";
        public const string ASSETS_PATH_AVATAR = @"@username\avatar\";
        public const string ASSETS_PATH_POST_IMAGE = @"@username\post_image\";
        public const string ASSETS_PATH_MESSAGE_IMAGE = @"@username\message_image\";

        public const int NOTIFICATION_TYPE_LIKE = 1;
        public const int NOTIFICATION_TYPE_COMMENT = 2;
        public const int NOTIFICATION_TYPE_RATE = 3;
        public const int NOTIFICATION_TYPE_FOLLOW = 4;
        public const int NOTIFICATION_TYPE_INVALID_IMAGE = 5;

        public const string NOTIFICATION_CONTENT_LIKE = "đã thích bài đăng của bạn";
        public const string NOTIFICATION_CONTENT_COMMENT = "đã bình luận về bài đăng của bạn";
        public const string NOTIFICATION_CONTENT_RATE = "đã đánh giá bài đăng của bạn";
        public const string NOTIFICATION_CONTENT_FOLLOW = "đã theo dõi bạn";
        public const string NOTIFICATION_CONTENT_INVALID_IMAGE = "Hình ảnh bạn vừa tải lên có nội dung không phù hợp! Mọi người sẽ không thể nhìn thầy bài viết này!";

        public const int POST_TYPE_NORMAL = 0;
        public const int POST_TYPE_PRODUCT = 1;
    }
}
