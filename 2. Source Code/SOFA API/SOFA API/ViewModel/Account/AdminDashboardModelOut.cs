using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Account
{
    public class AdminDashboardModelOut: BaseModelOut
    {
        public int TotalUser { get; set; }
        public int NumberOfUserActive { get; set; }
        public int TotalPost { get; set; }
        public int NumberOfPostVerified { get; set; }

        public AdminDashboardModelOut()
        {
        }

        public AdminDashboardModelOut(int totalUser, int numberOfUserActive, int totalPost, int numberOfPostVerified) : base()
        {
            TotalUser = totalUser;
            NumberOfUserActive = numberOfUserActive;
            TotalPost = totalPost;
            NumberOfPostVerified = numberOfPostVerified;
        }
    }
}
