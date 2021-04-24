using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Balance
{
    public class ZaloPayDataIn
    {
        public long AppID { get; set; }
        public string AppTransID { get; set; }
        public long AppTime { get; set; }
        public string AppUser { get; set; }
        public long Amount { get; set; }
        public string Embeddata { get; set; }
        public string Item { get; set; }
        public long ZPTransID { get; set; }
        public long ServerTime { get; set; }
        public long Channel { get; set; }
        public string MerchantUserID { get; set; }
        public long UserFeeAmount { get; set; }
        public long DiscountAmount { get; set; }

        public ZaloPayDataIn()
        {
        }

        public ZaloPayDataIn(long appID, string appTransID, long appTime, string appUser, long amount, string embeddata, string item, long zPTransID, long serverTime, long channel, string merchantUserID, long userFeeAmount, long discountAmount)
        {
            AppID = appID;
            AppTransID = appTransID;
            AppTime = appTime;
            AppUser = appUser;
            Amount = amount;
            Embeddata = embeddata;
            Item = item;
            ZPTransID = zPTransID;
            ServerTime = serverTime;
            Channel = channel;
            MerchantUserID = merchantUserID;
            UserFeeAmount = userFeeAmount;
            DiscountAmount = discountAmount;
        }
    }
}
