using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Verificatiton;
using System;
using System.Collections.Generic;
using System.Linq;
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
        /// Verify code that client send to server
        /// </summary>
        /// <param name="verificationModelIn">Data that client send to server</param>
        /// <returns>The response of request</returns>
        internal VerificationModelOut VerifyCode(VerificationModelIn verificationModelIn)
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
        /// Create new OTP code
        /// Save OTP code to database
        /// Send OTP to email or phone number
        /// </summary>
        /// <param name="verificationModelIn">Data that client send to server</param>
        /// <returns>The response of request</returns>
        public VerificationModelOut GetOTPCode(VerificationModelIn verificationModelIn)
        {
            VerificationModelOut verificationModelOut = new VerificationModelOut();

            var rand = new Random();
            //Create OTP has 6 digits by random
            int otp = 0;
            while (otp < 100000)
            {
                otp = otp * 10 + rand.Next(1, 9);
            }
            //Insert OTP to database
            int ID = 0;
            try
            {
                ID = OTPDAO.Instance.AddOTP(otp);
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                ID = 0;
            }
            if (ID > 0)
            {
                //Delete OTP after the time that set in Const (Unit is second)
                Task.Delay((Const.VERIFICATION_TIME_WAIT + 30) * 1000).ContinueWith((task) =>
                    {
                        OTPDAO.Instance.DeleteOTP(ID);
                    });
                verificationModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                verificationModelOut.TransactionID = ID;
            }
            else
            {
                verificationModelOut.Code = Const.REQUEST_CODE_FAILED;
                verificationModelOut.TransactionID = 0;
            }
            return verificationModelOut;
        }
    }
}
