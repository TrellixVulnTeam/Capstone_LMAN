using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Common
{
    /// <summary>
    /// Name of constant start withs " ,WARNING, ERROR"
    /// </summary>
    public class MessageUtils
    {
        public const string ERROR_VERFICATION_DONT_HAVE_EMAIL_AND_PHONE = "Can't miss both phone number and email";
        public const string ERROR_MISSING_FIRST_NAME = "Missing first name";
        public const string ERROR_MISSING_LAST_NAME = "Missing last name";
        public const string ERROR_MISSING_PHONE_NUMBER = "Missing phone number";
        public const string ERROR_UPDATE_FAILED = "Update failed!";
        public const string ERROR_TOPUP_FAILED = "Top Up failed!";
        public const string ERROR_ADD_VOUCHER_FAILED = "Add voucher failed!";
        public const string ERROR_VERIFICATION_DONT_HAVE_EMAIL_AND_PHONE = "Can't miss both phone number and email";
        public const string ERROR_VERIFICATION_DONT_HAVE_EMAIL = "Email not found";
        public const string ERROR_VERIFICATION_ACCOUNT_NOT_FOUND = "Account not found";
        public const string ERROR_REGISTER_PHONE_NUMBER_EXISTED = "Phone number have existed";
        public const string ERROR_DONT_HAVE_PERMISSION = "You don't have permission";
        public const string ERROR_ADD_NEW_MESSAGE_FAILED = "Send new message failed";
        public const string ERROR_DELETE_MESSAGE_FAILED = "Delete message failed";
        public const string ERROR_DELETE_CONVERSATION_FAILED = "Delete conversation failed";
    }


}
