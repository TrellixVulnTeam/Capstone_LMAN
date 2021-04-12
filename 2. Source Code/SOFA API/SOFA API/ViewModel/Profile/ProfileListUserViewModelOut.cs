using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Profile
{
    public class ProfileListUserViewModelOut : BaseModelOut
    {
        public List<ProfileModelOut> ListProfile { get; set; }

        public ProfileListUserViewModelOut() : base()
        {
            ListProfile = new List<ProfileModelOut>();
        }
        public ProfileListUserViewModelOut(List<ProfileModelOut> listProfile) : base()
        {
            ListProfile = listProfile;
        }
    }
}
