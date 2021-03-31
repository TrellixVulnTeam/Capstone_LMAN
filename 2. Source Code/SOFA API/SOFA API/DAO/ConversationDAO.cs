﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using SOFA_API.ViewModel.Conversation;
using SOFA_API.Common;

namespace SOFA_API.DAO
{
    public class ConversationDAO
    {
        private static ConversationDAO instance;

        public static ConversationDAO Instance
        {
            get
            {
                if (instance == null) instance = new ConversationDAO();
                return instance;
            }
            private set { instance = value; }
        }
        public ConversationDAO()
        {

        }
        /// <summary>
        /// Get All Acount chat with AccountId
        /// </summary>
        /// <param name="AccountId"></param>
        /// <returns></returns>
        public List<int> GetListAccountChat(int accountId)
        {
            List<int> chatWithListAccount = new List<int>();
            string sql = "EXEC  dbo.[GetListAccountChat] @AccountID";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountId });
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                            chatWithListAccount.Add((int)row["withAccountId"]);
                    }
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return chatWithListAccount;
        }
        public ListConversationViewModelOut getListConversation(int accountId, List<int> chatWithListAccount)
        {
            ListConversationViewModelOut listConversationView = new ListConversationViewModelOut();
            List<ConversationViewModelOut> listConversation = null;
            try
            {
                string sql = "EXEC getProfileByAccountID @accountId";
                DataTable getInfo = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountId });
                if (getInfo.Rows.Count > 0)
                {
                    foreach (DataRow row in getInfo.Rows)
                    {
                        listConversationView.AccountId = accountId;
                        listConversationView.FirstName = row["FirstName"].ToString(); ;
                        listConversationView.LastName = row["LastName"].ToString(); ;
                        listConversationView.AvatarUri = row["Avatar"].ToString(); ;
                        listConversationView.Avatar = row["Avatar"].ToString(); ;
                        listConversationView.UserName = row["UserName"].ToString(); ;
                    }

                }
                if (chatWithListAccount != null)
                {
                    listConversation = new List<ConversationViewModelOut>();
                    foreach (int chatWithAccount in chatWithListAccount)
                    {
                        if (chatWithAccount != -1)
                        {
                            string sqlgetLastMessage = "EXEC  dbo.[getLatMessage] @AccountID , @ChatWithAccountId ";
                            DataTable getLastMessage = DataProvider.Instance.ExecuteQuery(sqlgetLastMessage, new object[] { accountId, chatWithAccount });
                            foreach(DataRow row in getLastMessage.Rows)
                            {
                                listConversation.Add(new ConversationViewModelOut(row));
                            }
                        }
                    }
                }
                listConversationView.listConversation = listConversation;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                throw e;
            }
            return listConversationView;
        }


    }
}