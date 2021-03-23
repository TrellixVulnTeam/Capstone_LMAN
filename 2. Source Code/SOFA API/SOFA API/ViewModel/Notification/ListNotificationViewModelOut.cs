using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Notification
{
    public class ListNotificationViewModelOut : BaseModelOut
    {
        public List<NotificationViewModelOut> ListNoti { get; set; }

        public ListNotificationViewModelOut() : base()
        {
            ListNoti = new List<NotificationViewModelOut>();
        }

        public ListNotificationViewModelOut(List<NotificationViewModelOut> listNoti) : base()
        {
            ListNoti = listNoti;
        }
        
    }
}
