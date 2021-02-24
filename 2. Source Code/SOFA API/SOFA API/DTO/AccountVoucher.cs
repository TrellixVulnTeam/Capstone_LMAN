using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class AccountVoucher
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public int VoucherId { get; set; }
        public bool IsUsed { get; set; }

        public AccountVoucher()
        {
        }

        public AccountVoucher(int id, int accountId, int voucherId, bool isUsed)
        {
            Id = id;
            AccountId = accountId;
            VoucherId = voucherId;
            IsUsed = isUsed;
        }
    }
}
