using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Common
{
    public class Utils
    {
        private static Utils instance;

        public static Utils Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new Utils();
                }
                return instance;
            }
            private set
            {
                instance = value;
            }
        }
        
        public void SaveLog(string text)
        {
            string path = @"E:\Log.txt";
            if (!File.Exists(path))
            {
                using (StreamWriter sw = File.CreateText(path))
                {
                    DateTime dateTime = DateTime.Now;
                    sw.WriteLine(dateTime + ": " + text);
                }
            }
            else
            {
                using (StreamWriter sw = File.AppendText(path))
                {
                    DateTime dateTime = DateTime.Now;
                    sw.WriteLine(dateTime + ": " + text);
                }
            }
        }
    }
}
