using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace SOFA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        [HttpGet]
        public PhysicalFileResult GetFile(string path)
        {
            string src = path;
            return new PhysicalFileResult(@"C:\inetpub\wwwroot\assets\"+path,"image/jpeg");
        }

    }
}
