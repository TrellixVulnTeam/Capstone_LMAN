using Microsoft.AspNetCore.SignalR;
using SOFA_API.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Hubs
{
    public class MessageHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            int userID = Utils.Instance.GetUserID(Context.User.Claims);
            Session.addUserActive(userID);
            this.Clients.All.SendAsync("ChangeStatus", Session.ListUserActive);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            int userID = Utils.Instance.GetUserID(Context.User.Claims);
            Session.removeUserActive(userID);
            this.Clients.All.SendAsync("ChangeStatus", Session.ListUserActive);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
