using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SOFA_API.Common
{
    public class Utils
    {
        private static Utils instance;

        public static Utils Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new Utils();
                }
                return instance;
            }
            private set
            {
                instance = value;
            }
        }
        /// <summary>
        /// Save log to file E:\Log.txt
        /// </summary>
        /// <param name="text">Message that you want to save</param>
        public void SaveLog(string text)
        {
            string path = @"C:\inetpub\wwwroot\assets\Log.txt";
            if (!File.Exists(path))
            {
                using (StreamWriter sw = File.CreateText(path))
                {
                    DateTime dateTime = DateTime.Now;
                    sw.WriteLine(dateTime + ": " + text);
                }
            }
            else
            {
                using (StreamWriter sw = File.AppendText(path))
                {
                    DateTime dateTime = DateTime.Now;
                    sw.WriteLine(dateTime + ": " + text);
                }
            }
        }
        /// <summary>
        /// Save Image to server storage
        /// </summary>
        /// <param name="content">Image in base64 string format</param>
        /// <param name="path">Path save image in server (@username/avatar/sample.png)</param>
        /// <param name="fileName">Name of file save in storage</param>
        public void SaveImageFromBase64String(string content, string path, string fileName)
        {
            var bytes = Convert.FromBase64String(content);
            path = Path.Combine(Const.ASSETS_PATH, path);
            //Check if directory exist
            if (!System.IO.Directory.Exists(path))
            {
                //Create directory if it doesn't exist
                Directory.CreateDirectory(path);
            }
            //set the image path
            string imgPath = Path.Combine(path, fileName);
            using (var imageFile = new FileStream(imgPath, FileMode.Create))
            {
                imageFile.Write(bytes, 0, bytes.Length);
                imageFile.Flush();
            }
        }
        /// <summary>
        /// Send mail to user
        /// </summary>
        /// <param name="destination">Email of receiver</param>
        /// <param name="subject">Subject of mail</param>
        /// <param name="content">Content of mail</param>
        public void SendMail(string destination, string subject, string content)
        {
            SaveLog("Send mail: " + destination + "\r\n" + subject + "\r\n" + content);
            MailMessage mailMessage = new MailMessage("SOFATeam2021@gmail.com", destination, subject, content);
            mailMessage.IsBodyHtml = true;
            SmtpClient smtpClient = new SmtpClient(Const.SMTP_GMAIL);
            smtpClient.Host = Const.SMTP_GMAIL;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Port = 587;
            smtpClient.Credentials = new NetworkCredential(Const.GMAIL_ACCOUNT, Const.GMAIL_APPLICATION_PASSWORD);
            smtpClient.EnableSsl = true;
            smtpClient.Send(mailMessage);
        }

        /// <summary>
        /// Send sms message to user
        /// </summary>
        /// <param name="phoneNumber">Phone number of receiver</param>
        /// <param name="content">Content of message</param>
        public void SendSMS(string phoneNumber, string content)
        {
            SaveLog("Send SMS: " + phoneNumber + "\r\n" + content);
            SpeedSMSAPI speedSMSAPI = new SpeedSMSAPI();
            String[] phone = new string[] { phoneNumber };
            String response = speedSMSAPI.sendSMS(phone, content, 3, Const.SPEEDSMS_SENDER_ANHTRANG);
            SaveLog(response);
        }
        /// <summary>
        /// Get ID of user in User claim
        /// </summary>
        /// <param name="claim">User.Claims</param>
        /// <returns>Id of user (int)</returns>
        public int GetUserID(IEnumerable<System.Security.Claims.Claim> claims)
        {
            int id = 0;
            var idClaim = claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            if (idClaim != null)
            {
                id = Int32.Parse(idClaim.Value.Trim());
            }
            return id;
        }
    }
}
