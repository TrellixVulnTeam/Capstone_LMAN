using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Balance
{
    public class ZaloPayTopupModelIn
    {
        public String Data { get; set; }
        public string Mac { get; set; }

        public ZaloPayTopupModelIn()
        {
        }

        public ZaloPayTopupModelIn(string data, string mac)
        {
            Data = data;
            Mac = mac;
        }
    }
}
