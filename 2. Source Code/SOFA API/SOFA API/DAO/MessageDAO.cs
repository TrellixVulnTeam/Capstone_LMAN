using SOFA_API.Common;
using SOFA_API.ViewModel.Message;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class MessageDAO
    {
        private static MessageDAO instance;

        public static MessageDAO Instance
        {
            get
            {
                if (instance == null) instance = new MessageDAO();
                return instance;
            }
            private set { instance = value; }
        }

        public ListMessageViewModelOut GetMessageByConversationId(int cid)
        {
            ListMessageViewModelOut listMes = new ListMessageViewModelOut();
            string sql = "EXEC getMessageByConversationId @conversationId";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { cid });
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        listMes.ListMess.Add(new MessageViewModelOut(row));
                    }
                }
            }catch(Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return listMes;

        }

        public ListMessageViewModelOut GetMessageBySenderAndReceiverId(int uid1, int uid2)
        {
            ListMessageViewModelOut listMes = new ListMessageViewModelOut();
            string sql = "EXEC getMessageBySenderAndReceiverID @userId1 , @userId2";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { uid1, uid2 });
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        listMes.ListMess.Add(new MessageViewModelOut(row));
                    }
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return listMes;

        }
    }
}
