using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.BaseModel
{
    public class BaseModelOut
    {
        public string Code { get; set; }
        public long ResponseTime { get; set; }
        public string ErrorMessage { get; set; }

        public BaseModelOut()
        {
            ResponseTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        }
    }
}
