using Microsoft.AspNetCore.SignalR;
using SOFA_API.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Hubs
{
    public class OnlineHub : Hub
    {
        public async Task RemoveConnection()
        {
            try
            {
                int userID = Utils.Instance.GetUserID(Context.User.Claims);
                Session.Instance.RemoveConnection(userID, Context.ConnectionId);
                await Clients.All.SendAsync("ChangeStatus", Session.Instance.GetListActive());
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
        }
        public override Task OnConnectedAsync()
        {
            try
            {
                int userID = Utils.Instance.GetUserID(Context.User.Claims);
                Session.Instance.AddConnection(userID, Context.ConnectionId);
                return Clients.All.SendAsync("ChangeStatus", Session.Instance.GetListActive());
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            try
            {
                int userID = Utils.Instance.GetUserID(Context.User.Claims);
                Session.Instance.RemoveConnection(userID, Context.ConnectionId);
                return Clients.All.SendAsync("ChangeStatus", Session.Instance.GetListActive());
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            return base.OnDisconnectedAsync(exception);
        }
    }
}
