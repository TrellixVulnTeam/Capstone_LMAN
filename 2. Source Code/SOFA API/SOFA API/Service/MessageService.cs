using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.ViewModel.Message;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class MessageService
    {
        private static MessageService instance;

        public static MessageService Instance
        {
            get
            {
                if (instance == null) instance = new MessageService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }

        public MessageService()
        {
        }

        /// <summary>
        /// GetMessageByConversationId
        /// </summary>
        /// <param name="cid"></param>
        /// <returns>List Message</returns>
        public ListMessageViewModelOut GetMessageByConversationId(int cid)
        {
            ListMessageViewModelOut listMess = null;
            try
            {
                listMess = MessageDAO.Instance.GetMessageByConversationId(cid);
                if(listMess != null)
                {
                    listMess.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    listMess.Code = Const.REQUEST_CODE_FAILED;
                    throw new Exception("Can get conversation");
                }
            }
            catch(Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                listMess.Code = Const.REQUEST_CODE_FAILED;
                listMess.ErrorMessage = e.Message;
            }
            return listMess;
        }

        /// <summary>
        /// GetMessageBySenderAndReceiverId
        /// </summary>
        /// <param name="uid1"></param>
        /// <param name="uid2"></param>
        /// <returns>List message</returns>
        public ListMessageViewModelOut GetMessageBySenderAndReceiverId(int uid1, int uid2)
        {
            ListMessageViewModelOut listMess = null;
            try
            {
                listMess = MessageDAO.Instance.GetMessageBySenderAndReceiverId(uid1, uid2);
                if (listMess != null)
                {
                    listMess.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    listMess.Code = Const.REQUEST_CODE_FAILED;
                    throw new Exception("Can get conversation");
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                listMess = new ListMessageViewModelOut();
                listMess.Code = Const.REQUEST_CODE_FAILED;
                listMess.ErrorMessage = e.Message;
            }
            return listMess;
        }

        /// <summary>
        /// InsertNewMessage
        /// </summary>
        /// <param name="message"></param>
        /// <returns>Number of inserted message</returns>
        public MessageViewModelOut InsertNewMessage(MessageViewModelIn message)
        {
            MessageViewModelOut newMessage = new MessageViewModelOut();
            try
            {
                if (!String.IsNullOrEmpty(message.ImageBase64))
                {
                    //Image path
                    String path = Const.ASSETS_PATH + @"message\" + message.ConversationId + @"\";
                    //save image
                    Utils.Instance.SaveImageFromBase64String(message.ImageBase64, path, Path.GetFileName(message.ImageUrl));
                }
                
                newMessage = MessageDAO.Instance.createNewMessage(message);
                if (newMessage.Code != Const.REQUEST_CODE_SUCCESSFULLY)
                {
                    newMessage.Code = Const.REQUEST_CODE_FAILED;
                    newMessage.ErrorMessage = MessageUtils.ERROR_ADD_NEW_MESSAGE_FAILED;
                    throw new Exception(MessageUtils.ERROR_ADD_NEW_MESSAGE_FAILED);
                }
            }
            catch (Exception e)
            {
                newMessage.ErrorMessage = e.ToString();
                newMessage.Code = Const.REQUEST_CODE_FAILED;
            }
            return newMessage;
        }
    }
}
