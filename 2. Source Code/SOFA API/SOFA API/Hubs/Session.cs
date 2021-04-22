using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Hubs
{
    public class Session
    {
        private static int NumberUserActive { get; set; }
        private static List<int> listUserActive;
        public static List<int> ListUserActive
        {
            get
            {
                if (listUserActive == null) listUserActive = new List<int>();
                return listUserActive;
            }
            private set
            {
                listUserActive = value;
            }
        }

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
