using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.BaseModel
{
    public class BaseModelIn
    {
        public long RequestTime { get; set; }

        public BaseModelIn()
        {
            RequestTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        }
    }
}
