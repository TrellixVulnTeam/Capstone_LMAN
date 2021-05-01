using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Message
{
    public class StringeeViewModelOut
    {
        public string Action { get; set; }
        public StringeeDestination From { get; set; }
        public StringeeDestination To { get; set; }
        public string CustomData { get; set; }

        public StringeeViewModelOut()
        {
        }

        public StringeeViewModelOut(string action, StringeeDestination from, StringeeDestination to, string customData)
        {
            Action = action;
            From = from;
            To = to;
            CustomData = customData;
        }
    }
    public class StringeeDestination
    {
        public string Type { get; set; }
        public string Number { get; set; }
        public string Alias { get; set; }

        public StringeeDestination()
        {
        }

        public StringeeDestination(string type, string number, string alias)
        {
            Type = type;
            Number = number;
            Alias = alias;
        }
    }
}
