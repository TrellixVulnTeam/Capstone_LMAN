using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.ViewModel.Message;
using System;
using System.Collections.Generic;
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
    }
}
