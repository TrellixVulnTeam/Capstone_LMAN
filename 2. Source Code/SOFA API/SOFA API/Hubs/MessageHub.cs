﻿using Microsoft.AspNetCore.SignalR;
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
                Session.Instance.AddConnection(userID, Context.ConnectionId);
                await Clients.All.SendAsync("ChangeStatus", Session.Instance.GetListActive());
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
        }
        public async Task OfflineChat(int userID)
        {
            Session.Instance.RemoveConnection(userID, Context.ConnectionId);
            await Clients.All.SendAsync("ChangeStatus", Session.Instance.GetListActive());
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
                Session.Instance.AddConnection(userID, Context.ConnectionId);
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
