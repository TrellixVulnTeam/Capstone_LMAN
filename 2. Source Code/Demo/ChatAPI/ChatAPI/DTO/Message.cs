using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAPI.DTO
{
    public class Message
    {
        public int ID { get; set; }
        public int SenderID { get; set; }
        public int ReceiverID { get; set; }
        public string Content { get; set; }
        public bool IsSeen { get; set; }
        public string Image { get; set; }

        public Message()
        {
        }

        public Message(int iD, int senderID, int receiverID, string content, bool isSeen, string isHaveImage)
        {
            ID = iD;
            SenderID = senderID;
            ReceiverID = receiverID;
            Content = content;
            IsSeen = isSeen;
            Image = isHaveImage;
        }

        public Message(DataRow row)
        {
            ID = (int)row["id"];
            SenderID = (int)row["senderid"];
            ReceiverID = (int)row["receiverid"];
            Content = row["content"].ToString();
            IsSeen = (bool)row["isseen"];
            Image = row["image"].ToString();

        }
    }
}
