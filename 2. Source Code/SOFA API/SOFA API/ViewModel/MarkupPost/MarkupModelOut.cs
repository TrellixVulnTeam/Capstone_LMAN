using SOFA_API.ViewModel.Newsfeed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.MarkupPost
{
    public class MarkupModelOut
    {
        public int ID { get; set; }
        public int PostID { get; set; }
        public int AccountID { get; set; }
        public PostModelOut Post { get; set; }

        public MarkupModelOut()
        {
        }

        public MarkupModelOut(int iD, int postID, int accountID, PostModelOut post)
        {
            ID = iD;
            PostID = postID;
            AccountID = accountID;
            Post = new PostModelOut();
        }

        public void SetMarkupPost(DTO.MarkupPost markupPost)
        {
            ID = markupPost.ID;
            PostID = markupPost.PostID;
            AccountID = markupPost.AccountID;
        }
    }
}
