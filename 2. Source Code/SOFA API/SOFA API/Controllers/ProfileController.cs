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
            ProfileViewModelOut profile = ProfileService.Instance.getProfileByAccountID(id);
            return Ok(profile);
        }

        [HttpGet("otherprofile")]
        public ActionResult GetOtherProfile(int id)
        {
            int idx = id;
            ProfileViewModelOut profile = ProfileService.Instance.getProfileByAccountID(id);
            return Ok(profile);
        }

        [HttpPost("updateprofile")]
        public ActionResult UpdateProfile([FromForm] ProfileViewModelOut newProfile)
        {
            //get account ID
            var idClaim = User.Claims.FirstOrDefault(x => x.Type.Equals("id", StringComparison.InvariantCultureIgnoreCase));
            //int id = Int32.Parse(idClaim.Value.Trim());
            int id = 1;

            //get current data
            ProfileViewModelOut currentProfile = ProfileService.Instance.getProfileByAccountID(id);

            //update avatar
            String path = @"C:\inetpub\wwwroot\assets\Image\"+ currentProfile.UserName + @"\";

            //Check if directory exist
            if (!System.IO.Directory.Exists(path))
            {
                //Create directory if it doesn't exist
                Directory.CreateDirectory(path); 
            }

            //get current file name
            string imageName = Path.GetFileNameWithoutExtension(currentProfile.AvatarUri);

            //make new file name

            int newImageName = 1;
            bool checkConvert = Int32.TryParse(imageName, out  newImageName);
            if(checkConvert)
            {
                newImageName++;
            }

            //set the image path
            string imgPath = Path.Combine(path, (newImageName.ToString() + ".jpg"));

            byte[] imageBytes = Convert.FromBase64String(newProfile.Avatar.Trim().Replace(" ", "+"));
            System.IO.File.WriteAllBytes(imgPath, imageBytes);
            newProfile.AvatarUri = imgPath;

            ProfileViewModelOut profile = ProfileService.Instance.updateProfileByAccountID(id, newProfile);
            return Ok(profile);
        }

    }
}
