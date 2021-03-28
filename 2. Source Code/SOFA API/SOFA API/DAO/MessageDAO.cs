﻿using SOFA_API.Common;
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
                        MessageViewModelOut mess = new MessageViewModelOut(row);
                        mess.ImageUrl = row["Url"].ToString();
                        listMes.ListMess.Add(mess);
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
        /// Funtion to set delete flag for message
        /// </summary>
        /// <param name="messageId"></param>
        /// <param name="isSenderDelete"></param>
        /// <returns></returns>
        public int SetDeleteFlagForMessage(int messageId, bool isSenderDelete)
        {
            string sql = "EXEC SetDeleteFlagForMessage @messageId , @isDeletedBySender ";
            int result = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { messageId, isSenderDelete });
            return result;
        }

        /// <summary>
        /// Function create new Message
        /// </summary>
        /// <param name="mess"></param>
        /// <returns>number of created image</returns>
        public MessageViewModelOut createNewMessage(MessageViewModelIn mess)
        {
            MessageViewModelOut message = new MessageViewModelOut();
            string sql1 = "EXEC AddNewMessage @FromAccountId , @ToAccountId , @Content , @SenderDeleted , @ReceiverDeleted , @IsRead , @ConversationId , @Time";
            string sql2 = "EXEC AddNewMessageImage @time , @Url";
            string sql3 = "EXEC CreateNewConversation @TimeCreate , @TimeUpdate , @AccountId1 , @AccountId2 , @Account1Delete , @Account2Delete";
            string sql4 = "EXEC GetConversationBy2AccountId @AccountId1 , @AccountId2";
            try
            {
                if (mess.ConversationId == 0)
                {
                    DataTable dataTable3 = DataProvider.Instance.ExecuteQuery(sql4, new object[] { mess.FromAccountId, mess.ToAccountId });
                    if (dataTable3.Rows.Count > 0)
                    {
                        mess.ConversationId = (int)dataTable3.Rows[0]["Id"];
                    }
                    else
                    {
                        DataTable dataTable2 = DataProvider.Instance.ExecuteQuery(sql3, new object[] { mess.Time, mess.Time, mess.ToAccountId, mess.FromAccountId, false, false });
                        if (dataTable2.Rows.Count > 0)
                        {
                            mess.ConversationId = (int)dataTable2.Rows[0]["Id"];
                        }
                    }                
                }
                if (mess.Content == null) mess.Content = "";
                DataTable dataTable = DataProvider.Instance.ExecuteQuery(sql1, new object[] {mess.FromAccountId, mess.ToAccountId,
                                                                                  mess.Content, mess.SenderDeleted, mess.ReceiverDeleted,
                                                                                  mess.IsRead, mess.ConversationId, mess.Time});
                if(dataTable.Rows.Count > 0)
                {
                    message = new MessageViewModelOut(dataTable.Rows[0]);
                }
                if (!String.IsNullOrEmpty(mess.ImageBase64))
                {
                    DataTable dataTable1 = DataProvider.Instance.ExecuteQuery(sql2, new object[] { mess.Time, mess.ImageUrl });
                    if(dataTable1.Rows.Count > 0)
                    {
                        message.ImageUrl = dataTable1.Rows[0]["Url"].ToString();
                    }
                    
                }
                message.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                message.Code = Const.REQUEST_CODE_FAILED;
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return message;
        }
    }
}
