using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class SupportRequest
    {
        public int Id { get; set; }
        public int RequestType { get; set; }
        public int UserRequestId { get; set; }
        public string TimeCreate { get; set; }
        public int Status { get; set; }
        public string Respone { get; set; }

        public SupportRequest()
        {

        }

        public SupportRequest(int id, int requestType, int userRequestId, string timeCreate, int status, string respone)
        {
            this.Id = id;
            this.RequestType = requestType;
            this.UserRequestId = userRequestId;
            this.TimeCreate = timeCreate;
            this.Status = status;
            this.Respone = respone;
        }
    }
}
