using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.PostViewModel
{
    public class AdminPostModelOut
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string PostImageUri { get; set; }
        public string PostedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsActive { get; set; }

        public AdminPostModelOut()
        {

        }
        public AdminPostModelOut(DataRow row) : base()
        {
            Id = Int32.Parse(row["Id"].ToString());
            Content = row["content"].ToString();
            PostImageUri = row["PostImageUri"].ToString();
            PostedBy = row["userName"].ToString();
            DateCreated = !row.IsNull("DateCreated") ? (DateTime)row["DateCreated"] : DateTime.Now;
            IsActive = Boolean.Parse(row["IsActive"].ToString());
        }
    }
}
