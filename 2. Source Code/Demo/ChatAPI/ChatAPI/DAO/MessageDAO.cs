using ChatAPI.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAPI.DAO
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
        public MessageDAO()
        {

        }

        public int AddMessage(Message message)
        {
            int res = 0;

            string sql = "EXEC dbo.AddMessage @senderid , @receiverid , @content , @isseen ,  @image";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { message.SenderID, message.ReceiverID, message.Content, message.IsSeen, message.Image });
            if (data.Rows.Count > 0)
            {
                res = (int)data.Rows[0]["id"];
            }
            return res;
        }

        public int UpdateImageMessage(int id, Message message)
        {
            int res = 0;

            string sql = "EXEC dbo.UpdateImageMessage @id ,  @image";
            res = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { id, message.Image });

            return res;
        }

        public List<Message> GetAllMessageOfUser(int senderid, int receiverid)
        {
            List<Message> messages = new List<Message>();

            string sql = "EXEC dbo.GetAllMessageOfUser @senderid , @receiverid";
            DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { senderid, receiverid });

            if (data.Rows.Count > 0)
            {
                foreach (DataRow row in data.Rows)
                {
                    messages.Add(new Message(row));
                }
            }

            return messages;
        }
    }
}
