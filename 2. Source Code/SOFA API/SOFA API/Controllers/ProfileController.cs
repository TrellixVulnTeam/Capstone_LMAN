using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOFA_API.Service;
using SOFA_API.ViewModel;
using SOFA_API.ViewModel.Profile;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public ActionResult GetProfile()
        {
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());
            ProfileViewModelOut profile = ProfileService.Instance.GetProfileModelByAccountID(id);
            return Ok(profile);
        }

        [HttpGet("otherprofile")]
        public ActionResult GetOtherProfile(int id)
        {
            int idx = id;
            ProfileViewModelOut profile = ProfileService.Instance.GetProfileModelByAccountID(id);
            return Ok(profile);
        }

        [HttpPost("updateprofile")]
        public ActionResult UpdateProfile([FromForm] ProfileViewModelIn newProfile)
        {
            //get account ID
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());

            ProfileViewModelOut profile = ProfileService.Instance.UpdateProfileByAccountID(id, newProfile);
            return Ok(profile);
        }

        [HttpPost("updateavatar")]
        public ActionResult UpdateAvatar([FromForm] ProfileViewModelIn newProfile)
        {
            //get account ID
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            int id = Int32.Parse(idClaim.Value.Trim());

            ProfileViewModelOut profile = ProfileService.Instance.UpdateAvatarByAccountID(id, newProfile);
            return Ok(profile);
        }

    }
}
