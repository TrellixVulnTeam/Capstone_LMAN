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
        public async Task OnlineChat(int userID)
        {
            try
            {
                Session.addUserActive(userID);
                await Clients.All.SendAsync("ChangeStatus", Session.ListUserActive);
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
        }
        public async Task OfflineChat(int userID)
        {
            Session.removeUserActive(userID);
            await Clients.All.SendAsync("ChangeStatus", Session.ListUserActive);
        }
    }
}
