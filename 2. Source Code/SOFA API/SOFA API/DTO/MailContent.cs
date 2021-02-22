using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class MailContent
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }

        public MailContent()
        {
        }

        public MailContent(int iD, string code, string subject, string content)
        {
            ID = iD;
            Code = code;
            Subject = subject;
            Content = content;
        }
        public MailContent(DataRow row)
        {
            ID = (int)row["id"];
            Code = row["code"].ToString();
            Subject = row["subject"].ToString();
            Content = row["content"].ToString();
        }
    }
}
