using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Message
{
    public class ListMessageViewModelOut : BaseModelOut
    {
        public List<MessageViewModelOut> ListMess { get; set; }

        public ListMessageViewModelOut() : base()
        {
            ListMess = new List<MessageViewModelOut>();
        }

        public ListMessageViewModelOut(List<MessageViewModelOut> listPost) : base()
        {
            ListMess = listPost;
        }
    }
}
