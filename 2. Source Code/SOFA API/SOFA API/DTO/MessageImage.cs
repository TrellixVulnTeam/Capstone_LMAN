using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class MessageImage
    {
        public int ID { get; set; }
        public int MessageId { get; set; }
        public string Url { get; set; }

        public MessageImage()
        {

        }

        public MessageImage(int iD, int messageId, string url)
        {
            this.ID = iD;
            this.MessageId = messageId;
            this.Url = url;
        }

        public MessageImage(DataRow row)
        {
            this.ID = (int)row["Id"];
            this.MessageId = (int)row["MessageId"];
            this.Url = row["Url"].ToString();
        }
    }
}
