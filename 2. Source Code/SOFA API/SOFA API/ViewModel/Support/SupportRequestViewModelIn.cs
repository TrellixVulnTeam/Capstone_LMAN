using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Support
{
    public class SupportRequestViewModelIn : BaseModelIn
    {
        public int Id { get; set; }
        public int RequestType { get; set; }
        public int UserRequestId { get; set; }
        public string TimeCreate { get; set; }
        public int Status { get; set; }
        public string Respone { get; set; }

        public SupportRequestViewModelIn() : base()
        {

        }

        public SupportRequestViewModelIn(int id, int requestType, int userRequestId, string timeCreate, int status, string respone) : base()
        {
            this.Id = id;
            this.RequestType = requestType;
            this.UserRequestId = userRequestId;
            this.TimeCreate = timeCreate;
            this.Status = status;
            this.Respone = respone;
        }

        public SupportRequestViewModelIn(DataRow row) : base()
        {
            this.Id = (int)row["Id"];
            this.RequestType = (int)row["RequestType"];
            this.UserRequestId = (int)row["UserRequestId"];
            this.TimeCreate = row["TimeCreate"].ToString();
            this.Status = (int)row["Status"];
            this.Respone = Convert.IsDBNull(row["Respone"]) ? "" : row["Respone"].ToString();
        }
    }
}
