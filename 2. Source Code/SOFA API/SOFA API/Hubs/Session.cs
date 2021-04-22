using SOFA_API.Common;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Hubs
{
    public class Session
    {
        private Hashtable ListConnection;
        private static Session instance;

        public static Session Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new Session();
                }
                return instance;
            }
            private set
            {
                instance = value;
            }
        }

        public Session()
        {
            ListConnection = new Hashtable();
        }


        public void AddConnection(int userID, string connectionID)
        {
            Utils.Instance.SaveLog(userID + " - " + connectionID);
            if (ListConnection.ContainsKey(userID))
            {
                List<string> connections = (List<string>)ListConnection[userID];
                connections.Add(connectionID);
                ListConnection[userID] = connections;
            }
            else
            {
                List<string> connections = new List<string>();
                connections.Add(connectionID);
                ListConnection.Add(userID, connections);
            }
        }
        public void RemoveConnection(int userID, string connectionID)
        {
            Utils.Instance.SaveLog(userID + " - " + connectionID);
            if (ListConnection.ContainsKey(userID))
            {
                List<string> connections = (List<string>)ListConnection[userID];
                connections.Remove(connectionID);
                if (connections.Count == 0)
                {
                    ListConnection.Remove(userID);
                }
                else
                {
                    ListConnection[userID] = connections;
                }
            }
        }
        public List<int> GetListActive()
        {
            return (List<int>)ListConnection.Keys;
        }

    }
}
