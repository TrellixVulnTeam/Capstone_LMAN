using SOFA_API.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class MailContentDAO
    {
        private static MailContentDAO instance;
        public static MailContentDAO Instance
        {
            get
            {
                if (instance == null) instance = new MailContentDAO();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }

        public MailContent GetMailContentByID(int id)
        {
            MailContent mailContent = null;
            string sql = "EXEC dbo.GETMailContentByID @id";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { id });
            if (data.Rows.Count > 0)
            {
                mailContent = new MailContent(data.Rows[0]);
            }
            return mailContent;
        }
        public MailContent GetMailContentByCode(string code)
        {
            MailContent mailContent = null;
            string sql = "EXEC dbo.GETMailContentByCode @code";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { code });
            if (data.Rows.Count > 0)
            {
                mailContent = new MailContent(data.Rows[0]);
            }
            return mailContent;
        }
    }
}
