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

        public void SaveLog(string text)
        {
            string path = @"E:\Log.txt";
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
        public void SendMail(string destination, string subject, string content)
        {
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
    }
}
