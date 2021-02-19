using ChatAPI.Common;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ChatAPI.Hubs
{
    public class UserProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            
            var idClaim = connection.User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            Utils.Instance.SaveLog(idClaim.Value);
            string id = idClaim.Value;
            return id;
        }
    }
}
