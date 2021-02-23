using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Verificatiton;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class VerificationService
    {
        private static VerificationService instance;

        public static VerificationService Instance
        {
            get
            {
                if (instance == null) instance = new VerificationService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }
        public VerificationService() { }
        /// <summary>
        /// Send OTP to user's phone number
        /// </summary>
        /// <param name="otp">OTP of transaction (a random number include 6 digits)</param>
        /// <param name="phone">Phone number of user</param>
        /// <param name="lastName">Last name of user</param>
        public void SendSMS(int otp, string phone, string lastName)
        {
            MailContent mailContent = MailContentDAO.Instance.GetMailContentByCode(Const.SMS_TYPE_OTP_GENERAL);
            if (mailContent != null)
            {
                mailContent.Content = mailContent.Content.Replace("@otp", otp.ToString());
                mailContent.Content = mailContent.Content.Replace("@lastname", lastName);
                Utils.Instance.SendSMS(phone, mailContent.Content);
            }
        }

        /// <summary>
        /// Send OTP to user's email
        /// </summary>
        /// <param name="otp">OTP of transaction (a random number include 6 digits)</param>
        /// <param name="email">Email of user</param>
        /// <param name="lastName">Last name of user</param>
        private void SendMail(int otp, string email, string lastName)
        {
            MailContent mailContent = MailContentDAO.Instance.GetMailContentByCode(Const.MAIL_TYPE_OTP_GENERAL);
            if (mailContent != null)
            {
                mailContent.Content = mailContent.Content.Replace("@otp", otp.ToString());
                mailContent.Content = mailContent.Content.Replace("@lastname", lastName);
                Utils.Instance.SendMail(email, mailContent.Subject, mailContent.Content);
            }
        }
        /// <summary>
        /// Create OTP and save to database
        /// Delete OTP in database after wait time
        /// </summary>
        /// <returns>An OTP include transactionID and code</returns>
        public OTP CreateOTPCode()
        {
            OTP otp = new OTP(0,0);
            var rand = new Random();
            //Create OTP has 6 digits by random
            while (otp.Code < 100000)
            {
                otp.Code = otp.Code * 10 + rand.Next(1, 9);
            }
            //Insert OTP to database
            try
            {
                otp.ID = OTPDAO.Instance.AddOTP(otp.Code);
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            if (otp.ID > 0)
            {
                //Delete OTP after the time that set in Const (Unit is second)
                Task.Delay((Const.VERIFICATION_TIME_WAIT + 30) * 1000).ContinueWith((task) =>
                {
                    OTPDAO.Instance.DeleteOTP(otp.ID);
                });
            }
            return otp;
        }

        /// <summary>
        /// Create new OTP code
        /// Save OTP code to database
        /// Send OTP to email or phone number
        /// </summary>
        /// <param name="verificationModelIn">Data that client send to server</param>
        /// <returns>The response of request</returns>
        public VerificationModelOut GetOTPCode(VerificationModelIn verificationModelIn)
        {
            Profile profile = null;
            VerificationModelOut verificationModelOut = new VerificationModelOut();
            //Verify phone for register
            if (verificationModelIn.TransactionType == Const.VERIFICATION_TRANSACTION_TYPE_REGISTER)
            {
                OTP otp = CreateOTPCode();
                if (otp.ID > 0)
                {
                    SendSMS(otp.Code, verificationModelIn.PhoneNumber, verificationModelIn.Username);
                    verificationModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    verificationModelOut.TransactionID = otp.ID;
                }
                else
                {
                    verificationModelOut.Code = Const.REQUEST_CODE_FAILED;
                    verificationModelOut.TransactionID = 0;
                }
            }
            else
            {
                //Get profile of user in database
                switch (verificationModelIn.Method)
                {
                    case Const.VERIFICATION_METHOD_USERNAME:
                        profile = ProfileDAO.Instance.GetProfileByUsername(verificationModelIn.Username);
                        break;
                    case Const.VERIFICATION_METHOD_EMAIL:
                        profile = ProfileDAO.Instance.GetProfileByEmail(verificationModelIn.Email);
                        break;
                    case Const.VERIFICATION_METHOD_PHONE:
                        profile = ProfileDAO.Instance.GetProfileByPhone(verificationModelIn.PhoneNumber);
                        break;
                    case Const.VERIFICATION_METHOD_ACCOUNT_ID:
                        profile = ProfileDAO.Instance.GetProfileByAccountID(verificationModelIn.AccountID);
                        break;
                }
                //Check have user in database
                if (profile != null)
                {
                    OTP otp = CreateOTPCode();
                    if (otp.ID > 0)
                    {
                        bool isSended = false;
                        switch (verificationModelIn.Method)
                        {
                            case Const.VERIFICATION_METHOD_PHONE:
                                isSended = true;
                                SendSMS(otp.Code, verificationModelIn.PhoneNumber, profile.LastName);
                                break;
                            default:
                                if ((profile.Email == null || profile.Email.Length == 0))
                                {
                                    verificationModelOut.Code = Const.REQUEST_CODE_FAILED;
                                    verificationModelOut.ErrorMessage = MessageUtils.ERROR_VERIFICATION_DONT_HAVE_EMAIL;
                                    verificationModelOut.TransactionID = 0;
                                    break;
                                }
                                isSended = true;
                                SendMail(otp.Code, profile.Email, profile.LastName);
                                break;
                        }
                        if (isSended)
                        {
                            verificationModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                            verificationModelOut.TransactionID = otp.ID;
                        }
                    }
                    else
                    {
                        verificationModelOut.Code = Const.REQUEST_CODE_FAILED;
                        verificationModelOut.TransactionID = 0;
                    }
                }
                else
                {
                    verificationModelOut.Code = Const.REQUEST_CODE_FAILED;
                    verificationModelOut.ErrorMessage = MessageUtils.ERROR_VERIFICATION_ACCOUNT_NOT_FOUND;
                    verificationModelOut.TransactionID = 0;
                }

            }
            return verificationModelOut;
        }

        /// <summary>
        /// Verify code that client send to server
        /// </summary>
        /// <param name="verificationModelIn">Data that client send to server</param>
        /// <returns>The response of request</returns>
        public VerificationModelOut VerifyCode(VerificationModelIn verificationModelIn)
        {
            VerificationModelOut verificationModelOut = new VerificationModelOut();

            OTP otp = OTPDAO.Instance.GetOTPByID(verificationModelIn.ID);
            if (otp != null)
            {
                verificationModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                if (verificationModelIn.Code == otp.Code)
                {
                    verificationModelOut.VerificationStatus = Const.VERIFICATION_STATUS_MATCH;
                    OTPDAO.Instance.DeleteOTP(verificationModelIn.ID);
                }
                else
                {
                    verificationModelOut.VerificationStatus = Const.VERIFICATION_STATUS_NOT_MATCH;
                }
            }
            else
            {
                verificationModelOut.Code = Const.REQUEST_CODE_FAILED;
            }
            return verificationModelOut;

        }
        /// <summary>
        /// Compare OTP of an transaction
        /// </summary>
        /// <param name="transactionID">ID of transaction. The ID will sent to client when request get otp</param>
        /// <param name="code">OTP code that client send to server</param>
        /// <returns>True if the code match with code of transaction in database. False if not match</returns>
        public bool VerifyCode(int transactionID, int code)
        {
            bool response = false;
            OTP otp = OTPDAO.Instance.GetOTPByID(transactionID);
            if (otp != null)
            {

                if (code == otp.Code)
                {
                    response = true;
                    OTPDAO.Instance.DeleteOTP(transactionID);
                }
                else
                {
                    response = false;
                }
            }
            else
            {
                response = false;
            }
            return response;
        }
    }
}
