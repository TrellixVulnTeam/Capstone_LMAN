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

        /// <summary>
        /// Get Message By Conversation Id
        /// </summary>
        /// <param name="cid"></param>
        /// <returns>List Message</returns>
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

        /// <summary>
        /// Function to get message by sender and receiverId 
        /// </summary>
        /// <param name="uid1"></param>
        /// <param name="uid2"></param>
        /// <returns>List Messsage</returns>
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

        /// <summary>
        /// Function create new Message
        /// </summary>
        /// <param name="mess"></param>
        /// <returns>number of created image</returns>
        public int createNewMessage(MessageViewModelIn mess)
        {
            int record = 0;
            string sql1 = "EXEC AddNewMessage @FromAccountId , @ToAccountId , @Content , @SenderDeleted , @ReceiverDeleted , @IsRead , @ConversationId , @Time";
            string sql2 = "EXEC AddNewMessageImage @time , @Url";
            try
            {
                record = DataProvider.Instance.ExecuteNonQuery(sql1, new object[] {mess.FromAccountId, mess.ToAccountId,
                                                                                  mess.Content, mess.SenderDeleted, mess.ReceiverDeleted,
                                                                                  mess.IsRead, mess.ConversationId, mess.Time});
                if (!String.IsNullOrEmpty(mess.ImageUrl))
                {
                    int insertImage = DataProvider.Instance.ExecuteNonQuery(sql2, new object[] { mess.Time, mess.ImageUrl });
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return record;
        }
    }
}
