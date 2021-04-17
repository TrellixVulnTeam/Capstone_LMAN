using SOFA_API.ViewModel.Conversation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SOFA_API.DAO;
using SOFA_API.Common;

namespace SOFA_API.Service
{
    public class ConversationService
    {
        public static ConversationService instance;
        public static ConversationService Instance
        {
            get
            {
                if (instance == null) instance = new ConversationService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }
        public ConversationService()
        {
        }
        /// <summary>
        /// Get List Conversation
        /// </summary>
        /// <param name="modelIn"></param>
        /// <returns></returns>
        public ListConversationViewModelOut getListConversation(int accountId)
        {
            ListConversationViewModelOut listConversation = new ListConversationViewModelOut();
            try
            {
                List<int> listChatwith = ConversationDAO.Instance.GetListAccountChat(accountId);
                listConversation = ConversationDAO.Instance.GetListConversation(accountId, listChatwith);
                listConversation.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                listConversation.Code = Const.REQUEST_CODE_FAILED;
                listConversation.ErrorMessage = ex.Message;
            }
            return listConversation;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="accountId"></param>
        /// <param name="keySearch"></param>
        /// <returns></returns>
        public ListSearchConversationViewModelOut SearchConversation(int accountId, string keySearch)
        {
            ListSearchConversationViewModelOut listSearch = new ListSearchConversationViewModelOut();
            try
            {
                listSearch = ConversationDAO.Instance.SearchConversation(accountId, keySearch);
                listSearch.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                listSearch.Code = Const.REQUEST_CODE_FAILED;
                listSearch.ErrorMessage = ex.Message;

            }
            return listSearch;
        }
        public ListSearchConversationViewModelOut GetAllUserSearch(int accountId)
        {
            ListSearchConversationViewModelOut listSearch = new ListSearchConversationViewModelOut();
            try
            {
                listSearch = ConversationDAO.Instance.GetAllUserSearch(accountId);
                listSearch.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception ex)
            {
                Utils.Instance.SaveLog(ex.ToString());
                listSearch.Code = Const.REQUEST_CODE_FAILED;
                listSearch.ErrorMessage = ex.Message;

            }
            return listSearch;
        }

        public ListConversationViewModelOut GetNumberUnreadMessage(int userID)
        {
            ListConversationViewModelOut listConversationViewModelOut = new ListConversationViewModelOut();

            try
            {
                listConversationViewModelOut.NumberUnreadMessage = ConversationDAO.Instance.GetNumberUnreadMessage(userID);
                listConversationViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                listConversationViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                listConversationViewModelOut.ErrorMessage = e.ToString();
            }

            return listConversationViewModelOut;
        }

        internal ListConversationViewModelOut MarkConversationIsReaded(int fromAccount, int toAccount)
        {
            ListConversationViewModelOut listConversationViewModelOut = new ListConversationViewModelOut();
            try
            {
                int res = ConversationDAO.Instance.MarkConversationIsReaded(fromAccount, toAccount);
                listConversationViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                listConversationViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                listConversationViewModelOut.ErrorMessage = e.ToString();
            }

            return listConversationViewModelOut;
        }

        public ConversationViewModelOut DeleteConversation(int accountId, int chatWithAccountId)
        {
            ConversationViewModelOut newConversation = new ConversationViewModelOut();
            try
            {
                int result = ConversationDAO.Instance.DeleteConvsersation(accountId, chatWithAccountId);
                if (result == 0)
                {
                    newConversation.Code = Const.REQUEST_CODE_FAILED;
                    newConversation.ErrorMessage = MessageUtils.ERROR_DELETE_CONVERSATION_FAILED;
                }
                else
                {
                    newConversation.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
            }
            catch (Exception e)
            {
                newConversation.ErrorMessage = e.ToString();
                newConversation.Code = Const.REQUEST_CODE_FAILED;
            }
            return newConversation;
        }
    }
}
