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
        public static string ERROR_VERFICATION_DONT_HAVE_EMAIL_AND_PHONE = "Can't miss both phone number and email";
        public static string ERROR_MISSING_FIRST_NAME = "Missing first name";
        public static string ERROR_MISSING_LAST_NAME = "Missing last name";
        public static string ERROR_MISSING_PHONE_NUMBER = "Missing phone number";
        public static string ERROR_UPDATE_FAILED = "Update failed!";
        public static string ERROR_TOPUP_FAILED = "Top Up failed!";
    }


}
