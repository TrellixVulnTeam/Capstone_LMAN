using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Hubs
{
    public class Session
    {
        public static int NumberUserActive { get; set; }
        public static List<int> ListUserActive { get; set; }
        public static void addUserActive(int userID)
        {
            if (ListUserActive == null)
            {
                ListUserActive = new List<int>();
            }
            if (ListUserActive.IndexOf(userID) == -1)
            {
                ListUserActive.Add(userID);
            }
        }
        public static void removeUserActive(int userID)
        {
            if (ListUserActive == null)
            {
                ListUserActive = new List<int>();
            }
            if (ListUserActive.IndexOf(userID) != -1)
            {
                ListUserActive.Remove(userID);
            }
        }
    }
}
