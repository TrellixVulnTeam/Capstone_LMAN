using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Post
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public Post()
        {

        }
        public Post(string title, string content)
        {
            this.Title = title;
            this.Content = content;
        }
    }
}
