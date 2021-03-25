using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace SOFA_API.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        [HttpGet]
        public PhysicalFileProvider GetFile(string path)
        {
            return new PhysicalFileProvider("C:\\inetpub\\wwwroot\\assets\\" + path);
        }

    }
}
