using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Newsfeed
{
    public class ImageModelIn
    {
        public string Image { get; set; }
        public int ImageType { get; set; }

        public ImageModelIn()
        {
        }

        public ImageModelIn(string image, int imageType)
        {
            Image = image;
            ImageType = imageType;
        }
    }
}
